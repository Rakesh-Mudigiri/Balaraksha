/**
 * బాలరక్ష - Child Matching System
 * AI-powered matching between missing children and found child reports
 */

const MatchingSystem = {
    // Match thresholds
    THRESHOLDS: {
        HIGH_CONFIDENCE: 80,
        MEDIUM_CONFIDENCE: 60,
        LOW_CONFIDENCE: 40
    },

    // Calculate match score between missing and found child
    calculateMatchScore(missingChild, foundChild) {
        let score = 0;
        let weights = {
            gender: 30,
            age: 25,
            district: 15,
            description: 20,
            distinguishingMarks: 10
        };
        let totalWeight = 0;

        // Gender match
        if (missingChild.childGender && foundChild.gender) {
            totalWeight += weights.gender;
            if (missingChild.childGender === foundChild.gender) {
                score += weights.gender;
            }
        }

        // Age match
        if (missingChild.childAge && foundChild.age) {
            totalWeight += weights.age;
            if (missingChild.childAge === foundChild.age) {
                score += weights.age;
            } else if (this.ageOverlaps(missingChild.childAge, foundChild.age)) {
                score += weights.age * 0.6;
            }
        }

        // District proximity
        if (missingChild.district && foundChild.district) {
            totalWeight += weights.district;
            if (missingChild.district.toLowerCase() === foundChild.district.toLowerCase()) {
                score += weights.district;
            } else if (this.isNearbyDistrict(missingChild.district, foundChild.district)) {
                score += weights.district * 0.5;
            }
        }

        // Description similarity
        if (missingChild.physicalDescription && foundChild.description) {
            totalWeight += weights.description;
            const similarity = this.calculateTextSimilarity(
                missingChild.physicalDescription,
                foundChild.description
            );
            score += weights.description * similarity;
        }

        // Distinguishing marks
        if (missingChild.distinguishingMarks && foundChild.description) {
            totalWeight += weights.distinguishingMarks;
            const markMatch = this.checkDistinguishingMarks(
                missingChild.distinguishingMarks,
                foundChild.description
            );
            score += weights.distinguishingMarks * markMatch;
        }

        // Photo similarity (simulated - in real system would use AI)
        if (missingChild.photos && missingChild.photos.length > 0) {
            // Boost score if photos available (simulated AI match)
            score += 5;
        }

        return totalWeight > 0 ? Math.round((score / totalWeight) * 100) : 0;
    },

    // Check if age ranges overlap
    ageOverlaps(age1, age2) {
        const ranges = {
            '0-2': [0, 2],
            '3-5': [3, 5],
            '6-10': [6, 10],
            '11-14': [11, 14],
            '15-18': [15, 18]
        };

        const r1 = ranges[age1];
        const r2 = ranges[age2];

        if (!r1 || !r2) return false;
        return !(r1[1] < r2[0] - 1 || r2[1] < r1[0] - 1);
    },

    // Check if districts are nearby
    isNearbyDistrict(d1, d2) {
        const nearbyMap = {
            'Hyderabad': ['Rangareddy', 'Medchal', 'Sangareddy', 'Secunderabad'],
            'Rangareddy': ['Hyderabad', 'Medchal', 'Mahbubnagar', 'Nalgonda'],
            'Medchal': ['Hyderabad', 'Rangareddy', 'Sangareddy', 'Siddipet'],
            'Warangal': ['Karimnagar', 'Khammam', 'Nalgonda', 'Jangaon'],
            'Karimnagar': ['Warangal', 'Nizamabad', 'Adilabad', 'Peddapalli'],
            'Nizamabad': ['Karimnagar', 'Adilabad', 'Kamareddy'],
            'Khammam': ['Warangal', 'Nalgonda', 'Bhadradri'],
            'Nalgonda': ['Hyderabad', 'Rangareddy', 'Khammam', 'Suryapet']
        };

        const d1Lower = d1.toLowerCase();
        const d2Lower = d2.toLowerCase();

        for (const [district, neighbors] of Object.entries(nearbyMap)) {
            if (district.toLowerCase() === d1Lower) {
                return neighbors.some(n => n.toLowerCase() === d2Lower);
            }
        }
        return false;
    },

    // Calculate text similarity between descriptions
    calculateTextSimilarity(text1, text2) {
        const words1 = text1.toLowerCase().split(/\s+/).filter(w => w.length > 2);
        const words2 = text2.toLowerCase().split(/\s+/).filter(w => w.length > 2);

        let matches = 0;
        const importantWords = ['dark', 'light', 'fair', 'tall', 'short', 'thin', 'hair', 'black', 'brown', 'shirt', 'dress', 'pants', 'scar', 'mark'];

        words1.forEach(word => {
            if (words2.some(w => w.includes(word) || word.includes(w))) {
                matches++;
                // Extra weight for important descriptive words
                if (importantWords.some(iw => word.includes(iw))) {
                    matches += 0.5;
                }
            }
        });

        return Math.min(matches / Math.max(words1.length, 1), 1);
    },

    // Check distinguishing marks match
    checkDistinguishingMarks(marks, description) {
        const marksLower = marks.toLowerCase();
        const descLower = description.toLowerCase();

        const keywords = marksLower.split(/[,\s]+/).filter(w => w.length > 2);
        let matches = 0;

        keywords.forEach(keyword => {
            if (descLower.includes(keyword)) {
                matches++;
            }
        });

        return keywords.length > 0 ? matches / keywords.length : 0;
    },

    // Find all matches for a found child
    findMatchesForFoundChild(foundChild) {
        const missingChildren = JSON.parse(localStorage.getItem('balaraksha_missing_children') || '[]');
        const matches = [];

        missingChildren.forEach(missingChild => {
            const matchScore = this.calculateMatchScore(missingChild, foundChild);

            if (matchScore >= this.THRESHOLDS.LOW_CONFIDENCE) {
                matches.push({
                    missingChild,
                    matchScore,
                    confidence: this.getConfidenceLevel(matchScore),
                    matchDetails: this.getMatchDetails(missingChild, foundChild)
                });
            }
        });

        return matches.sort((a, b) => b.matchScore - a.matchScore);
    },

    // Find all matches for a missing child
    findMatchesForMissingChild(missingChild) {
        const foundChildren = JSON.parse(localStorage.getItem('balaraksha_cases') || '[]');
        const matches = [];

        foundChildren.forEach(foundChild => {
            const matchScore = this.calculateMatchScore(missingChild, foundChild);

            if (matchScore >= this.THRESHOLDS.LOW_CONFIDENCE) {
                matches.push({
                    foundChild,
                    matchScore,
                    confidence: this.getConfidenceLevel(matchScore),
                    matchDetails: this.getMatchDetails(missingChild, foundChild)
                });
            }
        });

        return matches.sort((a, b) => b.matchScore - a.matchScore);
    },

    // Get confidence level label
    getConfidenceLevel(score) {
        if (score >= this.THRESHOLDS.HIGH_CONFIDENCE) return 'High';
        if (score >= this.THRESHOLDS.MEDIUM_CONFIDENCE) return 'Medium';
        return 'Low';
    },

    // Get detailed match reasons
    getMatchDetails(missing, found) {
        const details = [];

        if (missing.childGender === found.gender) {
            details.push({ label: 'Same gender', icon: '✓' });
        }
        if (missing.childAge === found.age) {
            details.push({ label: 'Same age group', icon: '✓' });
        } else if (this.ageOverlaps(missing.childAge, found.age)) {
            details.push({ label: 'Similar age range', icon: '~' });
        }
        if (missing.district && found.district) {
            if (missing.district.toLowerCase() === found.district.toLowerCase()) {
                details.push({ label: 'Same district', icon: '✓' });
            } else if (this.isNearbyDistrict(missing.district, found.district)) {
                details.push({ label: 'Nearby district', icon: '~' });
            }
        }

        return details;
    },

    // Create notifications for matches
    createMatchNotifications(foundChild, matches) {
        const notifications = JSON.parse(localStorage.getItem('balaraksha_notifications') || '[]');

        matches.forEach(match => {
            // Notification for authorities/shelters
            notifications.push({
                id: `NOTIF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                type: 'match_found',
                priority: match.confidence === 'High' ? 'urgent' : 'high',
                foundChildId: foundChild.id,
                missingChildId: match.missingChild.id,
                matchScore: match.matchScore,
                confidence: match.confidence,
                message: `🔔 Potential Match Found!\n\nA found child report (${foundChild.id}) may match missing child "${match.missingChild.childName}".\n\nMatch Confidence: ${match.matchScore}% (${match.confidence})`,
                parentInfo: {
                    name: match.missingChild.parentName,
                    phone: match.missingChild.phoneNumber,
                    email: match.missingChild.email
                },
                createdAt: new Date().toISOString(),
                status: 'unread',
                actions: ['verify_match', 'dismiss', 'contact_parent']
            });
        });

        localStorage.setItem('balaraksha_notifications', JSON.stringify(notifications));
        return notifications;
    },

    // Get pending match notifications for shelter dashboard
    getPendingMatchesForShelter() {
        return JSON.parse(localStorage.getItem('balaraksha_shelter_matches') || '[]')
            .filter(m => m.status === 'pending_review');
    },

    // Get all notifications
    getNotifications(filter = 'all') {
        const notifications = JSON.parse(localStorage.getItem('balaraksha_notifications') || '[]');

        if (filter === 'all') return notifications;
        if (filter === 'unread') return notifications.filter(n => n.status === 'unread');
        if (filter === 'matches') return notifications.filter(n => n.type === 'match_found');

        return notifications;
    },

    // Mark notification as read
    markNotificationRead(notificationId) {
        const notifications = JSON.parse(localStorage.getItem('balaraksha_notifications') || '[]');
        const notification = notifications.find(n => n.id === notificationId);

        if (notification) {
            notification.status = 'read';
            notification.readAt = new Date().toISOString();
            localStorage.setItem('balaraksha_notifications', JSON.stringify(notifications));
        }
    },

    // Confirm a match
    confirmMatch(matchId) {
        const shelterMatches = JSON.parse(localStorage.getItem('balaraksha_shelter_matches') || '[]');
        const match = shelterMatches.find(m =>
            m.missingChild.id === matchId || m.foundChild.id === matchId
        );

        if (match) {
            match.status = 'confirmed';
            match.confirmedAt = new Date().toISOString();

            // Update missing child status
            const missingChildren = JSON.parse(localStorage.getItem('balaraksha_missing_children') || '[]');
            const missingChild = missingChildren.find(c => c.id === match.missingChild.id);
            if (missingChild) {
                missingChild.status = 'found';
                missingChild.matchedWith = match.foundChild.id;
                localStorage.setItem('balaraksha_missing_children', JSON.stringify(missingChildren));
            }

            // Update found child status
            const foundChildren = JSON.parse(localStorage.getItem('balaraksha_cases') || '[]');
            const foundChild = foundChildren.find(c => c.id === match.foundChild.id);
            if (foundChild) {
                foundChild.status = 'reunified';
                foundChild.matchedWith = match.missingChild.id;
                localStorage.setItem('balaraksha_cases', JSON.stringify(foundChildren));
            }

            localStorage.setItem('balaraksha_shelter_matches', JSON.stringify(shelterMatches));

            // Create success notification
            this.createReunificationNotification(match);
        }
    },

    // Dismiss a match
    dismissMatch(matchId) {
        const shelterMatches = JSON.parse(localStorage.getItem('balaraksha_shelter_matches') || '[]');
        const matchIndex = shelterMatches.findIndex(m =>
            m.missingChild.id === matchId || m.foundChild.id === matchId
        );

        if (matchIndex !== -1) {
            shelterMatches[matchIndex].status = 'dismissed';
            shelterMatches[matchIndex].dismissedAt = new Date().toISOString();
            localStorage.setItem('balaraksha_shelter_matches', JSON.stringify(shelterMatches));
        }
    },

    // Create reunification notification
    createReunificationNotification(match) {
        const notifications = JSON.parse(localStorage.getItem('balaraksha_notifications') || '[]');

        notifications.push({
            id: `NOTIF-REUNITE-${Date.now()}`,
            type: 'reunification',
            priority: 'success',
            message: `🎉 Family Reunification!\n\nChild "${match.missingChild.childName}" has been matched and verified with their family.`,
            parentInfo: {
                name: match.missingChild.parentName,
                phone: match.missingChild.phoneNumber
            },
            createdAt: new Date().toISOString(),
            status: 'unread'
        });

        localStorage.setItem('balaraksha_notifications', JSON.stringify(notifications));
    }
};

// Export for use in other files
if (typeof window !== 'undefined') {
    window.MatchingSystem = MatchingSystem;
}
