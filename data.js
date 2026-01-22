// ==================== FILE DATA AND CONTENT ====================

const files = [
    {
        id: 1,
        title: "E.N.D",
        description: "Data regarding the E.N.D Project also known as project 0",
        category: "project-0",
        icon: "fas fa-skull-crossbones",
        date: "The golden Age",
        size: "1 TB",
        tag: "E.N.D Protocol",
        classification: "Cozbi level access required",
        content: `
=== PROJECT 0: E.N.D (EMERGENCY NETWORK DIRECTIVE) ===
Access Level: COZBI REQUIRED
Last Updated: Golden Age Era
File Size: 1 Terabyte
Status: ACTIVE

[CLASSIFIED CONTENT]

The E.N.D Protocol is an autonomous adaptive system capable of evolving response strategies to any conceivable threat scenario, including anomalous phenomena, metaphysical manifestations, and reality-altering events. Developed during the Golden Age, this protocol operates on principles of predictive analytics and preemptive action against all forms of existential risk.

=== CORE COMPONENTS ===

1. Redacted
    • Redacted
    • Redacted
    • Redacted
    • Redacted
2. Redacted
    • Redacted
    • Redacted
    • Redacted
    • Redacted

3. UNIVERSAL THREAT CATALOG
   • Database of all documented anomalous events
   • Predictive modeling for emergent phenomena
   • Cross-dimensional threat assessment
   • Reality-failure prevention systems

=== ACCESS RESTRICTIONS ===

This file requires Cozbi-level clearance for access. Unauthorized attempts to access or disseminate this information will result in immediate erasure 

=== FOOTER ===
WARNING: The E.N.D Protocol represents ultimate authority in crisis response.
All decisions are final and irreversible.
Unauthorized access is punishable by erasure.
All views, across all timelines, are logged and monitored.
        `
    },
    {
        id: 2,
        title: "GENERALS",
        description: "Current Army Command Structure - Complete dossier of active generals",
        category: "current-army",
        icon: "fas fa-chess-king",
        date: "Current Age",
        size: "500 GB",
        tag: "Command Level",
        classification: "CONFIDENTIAL",
        content: `
=== CURRENT ARMY COMMAND STRUCTURE ===
Classification: CONFIDENTIAL
Last Updated: Current Age
File Size: 500 Gigabytes
Status: ACTIVE RECORDS

[ACTIVE GENERAL OFFICERS]

1. GENERAL Brawler
   • Position: Rank 3
   • Service: 25 years
   • Specialization: Taking down armies
   • Current Assignment: Scout
   • Clearance Level: General

2. GENERAL Gambler
   • Position: Rank 4
   • Service: 2 years
   • Specialization: Taking down enemies with too many abilities
   • Current Assignment: Scout
   • Clearance Level: General

3. GENERAL Scout
   • Position: Rank 5
   • Service: 10 years
   • Specialization: Hidden missions
   • Current Assignment: Finding artifacts
   • Clearance Level: General

4. GENERAL Trickster
   • Position: Rank 6
   • Service: 5 years
   • Specialization: Crowd control
   • Current Assignment: Scout
   • Clearance Level: General

[END OF CURRENT RECORDS]

=== SECURITY NOTICE ===
This document contains sensitive command structure information.
Distribution restricted to authorized personnel only.
All accesses are logged and reviewed weekly.
        `
    },
    {
        id: 3,
        title: "DAKA",
        description: "[DATA EXPUNGED] File appears corrupted. Access not recommended.",
        category: "corrupted",
        icon: "fas fa-exclamation-triangle",
        date: "[UNKNOWN]",
        size: "0 KB",
        tag: "CORRUPTED",
        classification: "BEYOND CLASSIFICATION",
        content: "[FILE CORRUPTED] [ACCESS DENIED]",
        isDaka: true // Special flag for the daka file
    }
];

// ==================== STATIC PROGRESS DATA ====================
const progressData = {
    currentProgress: 75,
    totalFiles: 3,
    processedFiles: 3,
    totalData: 1.50,
    analyzedData: 1.5,
    timeElapsed: "8.760.000"
};

// ==================== AUDIO FILE PATHS ====================
const audioPaths = {
    background: "Admin_Notes.wav_Honkai_Star_Rail_3.4_OST_320k.mp3",
    click: "Untitled video - Made with Clipchamp (1).m4a",
    glitch: "Undertale Ost_ The Fallen Child.mp3",
    glitchMusic: "Undertale Ost_ The Fallen Child.mp3" // New glitch-specific MP3
};