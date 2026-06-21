// ============================================
// BALARAKSHA - SAMPLE DATA MODULE
// Telangana Districts, Shelters, Cases
// ============================================

// Telangana Districts with coordinates
const telanganDistricts = [
    { id: 1, name: "Hyderabad", nameTE: "హైదరాబాద్", latitude: 17.3850, longitude: 78.4867 },
    { id: 2, name: "Rangareddy", nameTE: "రంగారెడ్డి", latitude: 17.2543, longitude: 78.0868 },
    { id: 3, name: "Medchal-Malkajgiri", nameTE: "మేడ్చల్-మల్కాజ్‌గిరి", latitude: 17.5393, longitude: 78.4785 },
    { id: 4, name: "Sangareddy", nameTE: "సంగారెడ్డి", latitude: 17.6166, longitude: 78.0866 },
    { id: 5, name: "Warangal Urban", nameTE: "వరంగల్ అర్బన్", latitude: 18.0000, longitude: 79.5880 },
    { id: 6, name: "Warangal Rural", nameTE: "వరంగల్ రూరల్", latitude: 18.1498, longitude: 79.5912 },
    { id: 7, name: "Karimnagar", nameTE: "కరీంనగర్", latitude: 18.4392, longitude: 79.1288 },
    { id: 8, name: "Nizamabad", nameTE: "నిజామాబాద్", latitude: 18.6725, longitude: 78.0942 },
    { id: 9, name: "Khammam", nameTE: "ఖమ్మం", latitude: 17.2473, longitude: 80.1514 },
    { id: 10, name: "Nalgonda", nameTE: "నల్గొండ", latitude: 17.0575, longitude: 79.2690 },
    { id: 11, name: "Mahabubnagar", nameTE: "మహబూబ్‌నగర్", latitude: 16.7488, longitude: 77.9891 },
    { id: 12, name: "Adilabad", nameTE: "ఆదిలాబాద్", latitude: 19.6641, longitude: 78.5320 },
    { id: 13, name: "Suryapet", nameTE: "సూర్యాపేట", latitude: 17.1367, longitude: 79.6262 },
    { id: 14, name: "Siddipet", nameTE: "సిద్దిపేట", latitude: 18.1048, longitude: 78.8520 },
    { id: 15, name: "Jagtial", nameTE: "జగిత్యాల", latitude: 18.7947, longitude: 78.9137 },
    { id: 16, name: "Mancherial", nameTE: "మంచిర్యాల", latitude: 18.8685, longitude: 79.4416 },
    { id: 17, name: "Peddapalli", nameTE: "పెద్దపల్లి", latitude: 18.6173, longitude: 79.3764 },
    { id: 18, name: "Kamareddy", nameTE: "కామారెడ్డి", latitude: 18.3225, longitude: 78.3340 },
    { id: 19, name: "Rajanna Sircilla", nameTE: "రాజన్న సిరిసిల్ల", latitude: 18.3865, longitude: 78.8104 },
    { id: 20, name: "Jangaon", nameTE: "జనగాం", latitude: 17.7281, longitude: 79.1520 },
    { id: 21, name: "Mahabubabad", nameTE: "మహబూబాబాద్", latitude: 17.5979, longitude: 80.0126 },
    { id: 22, name: "Bhadradri Kothagudem", nameTE: "భద్రాద్రి కొత్తగూడెం", latitude: 17.5530, longitude: 80.6199 },
    { id: 23, name: "Yadadri Bhuvanagiri", nameTE: "యాదాద్రి భువనగిరి", latitude: 17.0533, longitude: 78.8932 },
    { id: 24, name: "Vikarabad", nameTE: "వికారాబాద్", latitude: 17.3377, longitude: 77.9047 },
    { id: 25, name: "Wanaparthy", nameTE: "వనపర్తి", latitude: 16.3626, longitude: 78.0628 },
    { id: 26, name: "Nagarkurnool", nameTE: "నాగర్‌కర్నూల్", latitude: 16.4833, longitude: 78.3167 },
    { id: 27, name: "Jogulamba Gadwal", nameTE: "జోగులాంబ గద్వాల", latitude: 16.2333, longitude: 77.8000 },
    { id: 28, name: "Medak", nameTE: "మెదక్", latitude: 18.0500, longitude: 78.2667 },
    { id: 29, name: "Nirmal", nameTE: "నిర్మల్", latitude: 19.1000, longitude: 78.3500 },
    { id: 30, name: "Jayashankar Bhupalpally", nameTE: "జయశంకర్ భూపాలపల్లి", latitude: 18.4333, longitude: 79.9500 },
    { id: 31, name: "Mulugu", nameTE: "ములుగు", latitude: 18.1833, longitude: 79.9500 },
    { id: 32, name: "Narayanpet", nameTE: "నారాయణపేట", latitude: 16.7333, longitude: 77.5000 },
    { id: 33, name: "Kumuram Bheem Asifabad", nameTE: "కుమురం భీం ఆసిఫాబాద్", latitude: 19.3667, longitude: 79.2833 }
];

// Sample Shelters across districts
const shelters = [
    {
        id: "SH001",
        name: "Shishu Vihar Orphanage",
        nameTE: "శిశు విహార్ అనాథాశ్రమం",
        district: "Hyderabad",
        districtId: 1,
        address: "Musheerabad, Hyderabad - 500020",
        phone: "040-27562001",
        email: "shishu.vihar@gmail.com",
        type: "orphanage",
        capacity: 120,
        currentOccupancy: 85,
        ageGroup: "0-18",
        gender: "all",
        specializations: ["general", "education", "counseling"],
        facilities: ["dormitory", "school", "playground", "medical_room"],
        latitude: 17.4065,
        longitude: 78.4772,
        verified: true,
        rating: 4.5,
        govtApproved: true,
        lastUpdated: "2024-12-20"
    },
    {
        id: "SH002",
        name: "Hope Foundation Home",
        nameTE: "హోప్ ఫౌండేషన్ హోమ్",
        district: "Hyderabad",
        districtId: 1,
        address: "Secunderabad, Hyderabad - 500003",
        phone: "040-27732456",
        email: "hope.foundation@gmail.com",
        type: "shelter_home",
        capacity: 80,
        currentOccupancy: 62,
        ageGroup: "6-18",
        gender: "girls",
        specializations: ["education", "skill_training", "trauma_care"],
        facilities: ["dormitory", "vocational_training", "counseling_center"],
        latitude: 17.4340,
        longitude: 78.5025,
        verified: true,
        rating: 4.8,
        govtApproved: true,
        lastUpdated: "2024-12-19"
    },
    {
        id: "SH003",
        name: "Bal Bhavan Children's Home",
        nameTE: "బాల భవన్ చిల్డ్రన్స్ హోమ్",
        district: "Rangareddy",
        districtId: 2,
        address: "LB Nagar, Rangareddy - 500074",
        phone: "040-24531234",
        email: "balbhavan.rr@gmail.com",
        type: "orphanage",
        capacity: 100,
        currentOccupancy: 78,
        ageGroup: "0-14",
        gender: "all",
        specializations: ["infant_care", "education", "medical_care"],
        facilities: ["nursery", "school", "playground", "infirmary"],
        latitude: 17.3400,
        longitude: 78.5400,
        verified: true,
        rating: 4.3,
        govtApproved: true,
        lastUpdated: "2024-12-18"
    },
    {
        id: "SH004",
        name: "DCPU Observation Home",
        nameTE: "DCPU అబ్జర్వేషన్ హోమ్",
        district: "Warangal Urban",
        districtId: 5,
        address: "Hanamkonda, Warangal - 506001",
        phone: "0870-2578901",
        email: "dcpu.warangal@telangana.gov.in",
        type: "observation_home",
        capacity: 50,
        currentOccupancy: 28,
        ageGroup: "0-18",
        gender: "all",
        specializations: ["temporary_shelter", "legal_aid", "family_tracing"],
        facilities: ["dormitory", "counseling", "legal_support"],
        latitude: 18.0000,
        longitude: 79.5880,
        verified: true,
        rating: 4.0,
        govtApproved: true,
        lastUpdated: "2024-12-20"
    },
    {
        id: "SH005",
        name: "Sri Sai Orphanage",
        nameTE: "శ్రీ సాయి అనాథాశ్రమం",
        district: "Karimnagar",
        districtId: 7,
        address: "Karimnagar Town - 505001",
        phone: "0878-2234567",
        email: "srisai.karimnagar@gmail.com",
        type: "orphanage",
        capacity: 60,
        currentOccupancy: 45,
        ageGroup: "5-18",
        gender: "boys",
        specializations: ["education", "sports", "vocational"],
        facilities: ["hostel", "school", "sports_ground", "workshop"],
        latitude: 18.4392,
        longitude: 79.1288,
        verified: true,
        rating: 4.2,
        govtApproved: true,
        lastUpdated: "2024-12-17"
    },
    {
        id: "SH006",
        name: "Childline Shelter Nizamabad",
        nameTE: "చైల్డ్‌లైన్ షెల్టర్ నిజామాబాద్",
        district: "Nizamabad",
        districtId: 8,
        address: "Station Road, Nizamabad - 503001",
        phone: "08462-234890",
        email: "childline.nzb@gmail.com",
        type: "shelter_home",
        capacity: 40,
        currentOccupancy: 35,
        ageGroup: "0-18",
        gender: "all",
        specializations: ["emergency_care", "trauma_support", "family_reunification"],
        facilities: ["emergency_beds", "counseling", "medical"],
        latitude: 18.6725,
        longitude: 78.0942,
        verified: true,
        rating: 4.6,
        govtApproved: true,
        lastUpdated: "2024-12-20"
    },
    {
        id: "SH007",
        name: "Khammam Welfare Home",
        nameTE: "ఖమ్మం వెల్ఫేర్ హోమ్",
        district: "Khammam",
        districtId: 9,
        address: "Wyra Road, Khammam - 507001",
        phone: "08742-278901",
        email: "welfare.khammam@gmail.com",
        type: "orphanage",
        capacity: 70,
        currentOccupancy: 52,
        ageGroup: "3-18",
        gender: "all",
        specializations: ["education", "health", "recreation"],
        facilities: ["dormitory", "school", "clinic", "library"],
        latitude: 17.2473,
        longitude: 80.1514,
        verified: true,
        rating: 4.4,
        govtApproved: true,
        lastUpdated: "2024-12-15"
    },
    {
        id: "SH008",
        name: "Mahabubnagar Balika Ashram",
        nameTE: "మహబూబ్‌నగర్ బాలికా ఆశ్రమం",
        district: "Mahabubnagar",
        districtId: 11,
        address: "Town Center, Mahabubnagar - 509001",
        phone: "08542-267890",
        email: "balika.mbnr@gmail.com",
        type: "shelter_home",
        capacity: 50,
        currentOccupancy: 38,
        ageGroup: "6-18",
        gender: "girls",
        specializations: ["education", "skill_training", "women_empowerment"],
        facilities: ["hostel", "tailoring_unit", "computer_lab"],
        latitude: 16.7488,
        longitude: 77.9891,
        verified: true,
        rating: 4.5,
        govtApproved: true,
        lastUpdated: "2024-12-18"
    }
];

// Case Status Constants
const CASE_STATUS = {
    REPORTED: 'reported',
    VERIFIED: 'verified',
    DISPATCHED: 'dispatched',
    RESCUED: 'rescued',
    SHELTER_PLACED: 'shelter_placed',
    MEDICAL_CHECKUP: 'medical_checkup',
    JJ_BOARD_FILED: 'jj_board_filed',
    UNDER_INVESTIGATION: 'under_investigation',
    FAMILY_TRACED: 'family_traced',
    REHABILITATION: 'rehabilitation',
    REUNIFIED: 'reunified',
    ADOPTED: 'adopted',
    CLOSED: 'closed'
};

// Priority Levels
const PRIORITY = {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
};

// Sample Cases
const sampleCases = [
    {
        id: "CASE-2024-001247",
        childInfo: {
            estimatedAge: 7,
            gender: "male",
            physicalDescription: "Dark hair, blue shirt, barefoot",
            healthCondition: "appears malnourished"
        },
        reportedBy: {
            id: "USR001",
            name: "Anonymous",
            phone: null,
            type: "citizen"
        },
        location: {
            address: "Near Charminar, Old City, Hyderabad",
            district: "Hyderabad",
            latitude: 17.3616,
            longitude: 78.4747,
            landmark: "Near Mecca Masjid entrance"
        },
        status: CASE_STATUS.SHELTER_PLACED,
        priority: PRIORITY.HIGH,
        shelter: "SH001",
        reportedAt: "2024-12-20T14:30:00",
        rescuedAt: "2024-12-20T16:45:00",
        timeline: [
            { status: "reported", timestamp: "2024-12-20T14:30:00", note: "Anonymous citizen reported child" },
            { status: "verified", timestamp: "2024-12-20T14:45:00", note: "Call verified by DCPU" },
            { status: "dispatched", timestamp: "2024-12-20T15:00:00", note: "Volunteer team dispatched" },
            { status: "rescued", timestamp: "2024-12-20T16:45:00", note: "Child safely rescued" },
            { status: "shelter_placed", timestamp: "2024-12-20T18:00:00", note: "Placed in Shishu Vihar" }
        ]
    },
    {
        id: "CASE-2024-001246",
        childInfo: {
            estimatedAge: 4,
            gender: "female",
            physicalDescription: "Short hair, pink dress, crying",
            healthCondition: "healthy, distressed"
        },
        reportedBy: {
            id: "USR002",
            name: "Rajesh Kumar",
            phone: "9876543210",
            type: "citizen"
        },
        location: {
            address: "Secunderabad Railway Station Platform 3",
            district: "Hyderabad",
            latitude: 17.4339,
            longitude: 78.5018,
            landmark: "Platform 3"
        },
        status: CASE_STATUS.REUNIFIED,
        priority: PRIORITY.CRITICAL,
        shelter: "SH002",
        reportedAt: "2024-12-19T09:15:00",
        rescuedAt: "2024-12-19T10:30:00",
        resolvedAt: "2024-12-21T11:00:00",
        timeline: [
            { status: "reported", timestamp: "2024-12-19T09:15:00", note: "Citizen found lost child at station" },
            { status: "verified", timestamp: "2024-12-19T09:25:00", note: "RPF and DCPU notified" },
            { status: "dispatched", timestamp: "2024-12-19T09:30:00", note: "RPF team reached" },
            { status: "rescued", timestamp: "2024-12-19T10:30:00", note: "Child in safe custody" },
            { status: "shelter_placed", timestamp: "2024-12-19T12:00:00", note: "Temporary shelter at Hope Foundation" },
            { status: "family_traced", timestamp: "2024-12-20T15:00:00", note: "Parents traced via Aadhaar" },
            { status: "reunified", timestamp: "2024-12-21T11:00:00", note: "Child reunited with parents" }
        ]
    }
];

// User Roles
const USER_ROLES = {
    CITIZEN: 'citizen',
    VOLUNTEER: 'volunteer',
    SHELTER_ADMIN: 'shelter_admin',
    DCPU_OFFICER: 'dcpu_officer',
    POLICE: 'police',
    JJ_BOARD: 'jj_board',
    HEALTHCARE: 'healthcare',
    ADMIN: 'admin'
};

// Sample Users for Demo
const sampleUsers = [
    {
        id: "USR001",
        name: "Demo Citizen",
        phone: "9876543210",
        email: "citizen@demo.com",
        role: USER_ROLES.CITIZEN,
        verified: true,
        avatar: "👤"
    },
    {
        id: "USR002",
        name: "Shishu Vihar Admin",
        phone: "9876543211",
        email: "admin@shishuv.org",
        role: USER_ROLES.SHELTER_ADMIN,
        shelterId: "SH001",
        verified: true,
        avatar: "🏠"
    },
    {
        id: "USR003",
        name: "DCPU Officer - Hyderabad",
        phone: "9876543212",
        email: "dcpu.hyd@telangana.gov.in",
        role: USER_ROLES.DCPU_OFFICER,
        district: "Hyderabad",
        verified: true,
        avatar: "🏛️"
    },
    {
        id: "USR004",
        name: "Volunteer Ravi",
        phone: "9876543213",
        email: "ravi.volunteer@gmail.com",
        role: USER_ROLES.VOLUNTEER,
        skills: ["rescue", "transport", "counseling"],
        verified: true,
        available: true,
        avatar: "🤝"
    }
];

// Statistics Data
const platformStats = {
    totalShelters: 156,
    totalCapacity: 4850,
    currentOccupancy: 3210,
    availableBeds: 1640,
    childrenRescued: 1247,
    childrenReunified: 1109,
    reunificationRate: 89,
    avgResponseTime: 118, // minutes
    activeVolunteers: 892,
    districtsCovered: 33,
    casesThisMonth: 87,
    casesResolved: 72
};

// Analytics Data for Charts
const monthlyData = [
    { month: "Jan", reported: 65, rescued: 62, reunified: 48 },
    { month: "Feb", reported: 72, rescued: 70, reunified: 55 },
    { month: "Mar", reported: 88, rescued: 85, reunified: 68 },
    { month: "Apr", reported: 95, rescued: 92, reunified: 75 },
    { month: "May", reported: 78, rescued: 76, reunified: 62 },
    { month: "Jun", reported: 110, rescued: 105, reunified: 88 },
    { month: "Jul", reported: 120, rescued: 115, reunified: 95 },
    { month: "Aug", reported: 105, rescued: 102, reunified: 85 },
    { month: "Sep", reported: 92, rescued: 90, reunified: 72 },
    { month: "Oct", reported: 85, rescued: 83, reunified: 68 },
    { month: "Nov", reported: 98, rescued: 95, reunified: 78 },
    { month: "Dec", reported: 87, rescued: 84, reunified: 72 }
];

// Export data for use in other modules
window.appData = {
    districts: telanganDistricts,
    shelters,
    sampleCases,
    sampleUsers,
    platformStats,
    monthlyData,
    CASE_STATUS,
    PRIORITY,
    USER_ROLES
};
