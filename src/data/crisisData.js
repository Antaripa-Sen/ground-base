export const CRISIS_DATA = {
  fire: {
    id: 'fire', label: 'FIRE INCIDENT', subLabel: 'Structure / Environmental', icon: '🔥', color: '#ff3b3b',
    aiBlocks: [
      { heading: 'SITUATION ASSESSMENT', color: 'live', body: 'Fire alarm triggered on Level 3. Sensors indicate smoke spread to stairwell B. Thermal scan shows heat source in Server Room 3A.' },
      { heading: 'PRIORITY ACTIONS', color: 'pending', body: '1. Evacuate Level 3 immediately.\n2. Do NOT use elevators.\n3. Head to primary assembly point.\n4. Ensure all doors are closed behind you.' },
      { heading: 'COMMS READY', color: 'signal', body: 'Fire brigade and police protocols synchronized and ready for dispatch.' }
    ],
    tasks: [
      { id: 'f1', num: '01', title: 'Evacuate Area', description: 'Clear everyone from Level 3.' },
      { id: 'f2', num: '02', title: 'Pull Alarm', description: 'Ensure localized manual alarms are active.' },
      { id: 'f3', num: '03', title: 'Account for People', description: 'Take headcount at assembly point.' },
      { id: 'f4', num: '04', title: 'Direct Fire Brigade', description: 'Meet trucks at Main Entrance.' }
    ],
    primaryCallLabel: "CALL FIRE BRIGADE", primaryCallIcon: "🚒",
    primaryScript: "Fire Brigade, this is [YOUR NAME] at [YOUR LOCATION]. We have an active fire alarm on Level 3, confirmed smoke in stairwell B. Evacuation in progress. Need units immediately.",
    secondaryCallLabel: "CALL POLICE", secondaryCallIcon: "🚔",
    secondaryScript: "Police, requesting unit at [YOUR LOCATION] for traffic and crowd control due to an active structure fire. Heavy apparatus inbound."
  },
  medical: {
    id: 'medical', label: 'MEDICAL EMERGENCY', subLabel: 'Trauma / Health', icon: '🏥', color: '#05d97a',
    aiBlocks: [
      { heading: 'SITUATION ASSESSMENT', color: 'live', body: 'Adult male, ~50s, reported unresponsive in lobby. Bystander performing CPR. AED located at east stairwell, Level 2. Estimated ETA for paramedics: 8 minutes.' },
      { heading: 'PRIORITY ACTIONS', color: 'pending', body: '1. Clear 3-metre radius — assign one person to crowd control now.\n2. Retrieve AED from Level 2 east stairwell — runner needed immediately.\n3. Keep CPR continuous — do not stop until paramedics arrive.' },
      { heading: 'COMMS READY', color: 'signal', body: 'Local emergency medical dispatch networks connected.' }
    ],
    tasks: [
      { id: 'm1', num: '01', title: 'Clear the Area', description: 'Remove bystanders, maintain 3m radius.' },
      { id: 'm2', num: '02', title: 'Retrieve AED', description: 'East stairwell, Level 2 — run now.' },
      { id: 'm3', num: '03', title: 'Direct Paramedics', description: 'Meet at main entrance, guide to patient.' },
      { id: 'm4', num: '04', title: 'Document Incident', description: 'Log timeline for emergency services.' }
    ],
    primaryCallLabel: "CALL AMBULANCE", primaryCallIcon: "🚑",
    primaryScript: "Ambulance, this is [YOUR NAME]. I'm reporting a cardiac emergency at [YOUR LOCATION]. Adult male, approximately 50 years old, unresponsive, CPR in progress by a bystander. AED is being retrieved. We have someone at the main entrance to guide you in. Please confirm your ETA.",
    secondaryCallLabel: "CALL POLICE", secondaryCallIcon: "🚔",
    secondaryScript: "This is [YOUR NAME] calling from [YOUR LOCATION]. We have a medical emergency — an adult male is unresponsive and receiving CPR. We need police presence immediately to assist with crowd control and secure the area for incoming paramedics. Please advise on ETA."
  },
  security: {
    id: 'security', label: 'SECURITY BREACH', subLabel: 'Intrusion / Threat', icon: '🔒', color: '#3d8eff',
    aiBlocks: [
      { heading: 'SITUATION ASSESSMENT', color: 'live', body: 'Unauthorized individual reported in restricted zone B. Hostile behavior suspected. Campus security systems actively tracking subject.' },
      { heading: 'PRIORITY ACTIONS', color: 'pending', body: '1. Initiate localized lockdown for Zone B.\n2. Secure all electronic entry points.\n3. Instruct staff to remain in offices out of sight.' },
      { heading: 'COMMS READY', color: 'signal', body: 'Police and Security control lines standing by.' }
    ],
    tasks: [
      { id: 's1', num: '01', title: 'Lockdown Zone B', description: 'Seal all electronic doors in area.' },
      { id: 's2', num: '02', title: 'Review CCTV', description: 'Track subject movement on cameras.' },
      { id: 's3', num: '03', title: 'Alert Staff', description: 'Send SMS alert to stay in place.' },
      { id: 's4', num: '04', title: 'Brief Police', description: 'Meet units at security desk.' }
    ],
    primaryCallLabel: "CALL POLICE", primaryCallIcon: "🚔",
    primaryScript: "Police, we have an active security threat at [YOUR LOCATION]. Unauthorized individual in restricted zone, exhibiting hostile behavior. Full building lockdown initiated. Subject last seen on Level 2.",
    secondaryCallLabel: "CALL SECURITY", secondaryCallIcon: "🛡️",
    secondaryScript: "Control room, implement hard lockdown on Zone B immediately. We have a breach. Prepare to hand over CCTV feeds to local law enforcement."
  },
  flood: {
    id: 'flood', label: 'CRITICAL FLOOD', subLabel: 'Water / Structural', icon: '🌊', color: '#3d8eff',
    aiBlocks: [
      { heading: 'SITUATION ASSESSMENT', color: 'live', body: 'Water main rupture reported in basement level. Server racks at risk. Water level rising 2cm/min.' },
      { heading: 'PRIORITY ACTIONS', color: 'pending', body: '1. Shut off primary water main.\n2. Cut power to basement level 1.\n3. Deploy sandbags at server room door.' },
      { heading: 'COMMS READY', color: 'signal', body: 'Utility response teams mapped and ready.' }
    ],
    tasks: [
      { id: 'fl1', num: '01', title: 'Shut Water Main', description: 'Main valve located in utilities corridor.' },
      { id: 'fl2', num: '02', title: 'Cut Local Power', description: 'Isolate basement circuits.' },
      { id: 'fl3', num: '03', title: 'Protect Servers', description: 'Deploy water barricades.' },
      { id: 'fl4', num: '04', title: 'Evacuate Basement', description: 'Ensure no personnel remain below ground.' }
    ],
    primaryCallLabel: "CALL FACILITIES", primaryCallIcon: "🔧",
    primaryScript: "Facilities team, we have a major pipe rupture in the basement of [YOUR LOCATION]. Shut down primary water feed immediately and dispatch emergency pumps.",
    secondaryCallLabel: "CALL UTILITIES", secondaryCallIcon: "⚡",
    secondaryScript: "Emergency shut-off required for [YOUR LOCATION]. We are actively flooding and need grid isolation for the lower levels to prevent electrical hazards."
  },
  power: {
    id: 'power', label: 'POWER FAILURE', subLabel: 'Grid / Infrastructure', icon: '⚡', color: '#f5a623',
    aiBlocks: [
      { heading: 'SITUATION ASSESSMENT', color: 'live', body: 'Complete grid failure detected. Backup generator failed to start. UPS battery at 45 mins remaining.' },
      { heading: 'PRIORITY ACTIONS', color: 'pending', body: '1. Safely power down non-essential servers.\n2. Dispatch engineer to check generator.\n3. Provide flashlights to floor marshals.' },
      { heading: 'COMMS READY', color: 'signal', body: 'Direct line to grid operators enabled.' }
    ],
    tasks: [
      { id: 'p1', num: '01', title: 'Check Generator', description: 'Diagnose startup failure.' },
      { id: 'p2', num: '02', title: 'Server Shutdown', description: 'Execute graceful shutdown sequence.' },
      { id: 'p3', num: '03', title: 'Clear Elevators', description: 'Ensure nobody is trapped in lifts.' },
      { id: 'p4', num: '04', title: 'Distribute Lights', description: 'Deploy emergency lighting kits.' }
    ],
    primaryCallLabel: "CALL PROVIDER", primaryCallIcon: "⚡",
    primaryScript: "Reporting a total outage at [YOUR LOCATION]. Generator failed, UPS critical. Need immediate ETA on grid restoration.",
    secondaryCallLabel: "CALL FACILITIES", secondaryCallIcon: "🔧",
    secondaryScript: "Generator failed to auto-start. Dispatch duty engineer to the roof plant immediately. We have 45 minutes of UPS remaining."
  },
  other: {
    id: 'other', label: 'UNCLASSIFIED INCIDENT', subLabel: 'Unknown / Developing', icon: '⚫', color: '#7a8999',
    aiBlocks: [
      { heading: 'SITUATION ASSESSMENT', color: 'live', body: 'Unknown anomaly reported. Assessing threat vectors based on incoming sensor and user inputs. Stand by.' },
      { heading: 'PRIORITY ACTIONS', color: 'pending', body: '1. Establish visual confirmation of threat.\n2. Secure immediate perimeter.\n3. Await further analysis.' },
      { heading: 'COMMS READY', color: 'signal', body: 'All external dispatch protocols mapped to generic lines.' }
    ],
    tasks: [
      { id: 'o1', num: '01', title: 'Assess Situation', description: 'Gather info from witnesses.' },
      { id: 'o2', num: '02', title: 'Secure Area', description: 'Keep bystanders away from the sector.' },
      { id: 'o3', num: '03', title: 'Log Details', description: 'Note times, persons, descriptions.' },
      { id: 'o4', num: '04', title: 'Prepare Comms', description: 'Standby for authority contact.' }
    ],
    primaryCallLabel: "CALL POLICE", primaryCallIcon: "🚔",
    primaryScript: "Police, reporting an unclassified incident at [YOUR LOCATION]. Currently gathering details. Requesting a unit on standby while we assess the threat level.",
    secondaryCallLabel: "EMERGENCY LINE", secondaryCallIcon: "📞",
    secondaryScript: "Operator, we have an unclassified emergency at [YOUR LOCATION]. Requesting guidance and possible multi-agency dispatch once situation is confirmed."
  }
};
