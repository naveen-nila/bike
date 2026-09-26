export interface ManualDoc {
  id: string;
  title: string;
  model: string;
  year: string;
  fileSize: string;
  type: 'Owner Manual' | 'Repair & Workshop' | 'Suspension Tuning' | 'Wiring Telemetry';
  downloadUrl: string;
  description: string;
}

export const MANUALS: ManualDoc[] = [
  {
    id: 'man-apex390r-owner',
    title: 'APEX 390R Factory Official Owner\'s Handbook',
    model: 'APEX 390R',
    year: '2025/2026',
    fileSize: '8.4 MB',
    type: 'Owner Manual',
    downloadUrl: '#',
    description: 'Comprehensive rider instructions, break-in protocols, TFT cockpit navigation, riding mode customization, and daily maintenance checks.'
  },
  {
    id: 'man-apex390r-suspension',
    title: 'WP APEX 43mm & Monoshock Track Setup Guide',
    model: 'APEX 390R',
    year: '2025/2026',
    fileSize: '4.2 MB',
    type: 'Suspension Tuning',
    downloadUrl: '#',
    description: 'Sag calculation tables, spring preload click charts for solo/pillion/track day setups, and damping rebound recommendations.'
  },
  {
    id: 'man-apex890gp-workshop',
    title: 'APEX 890 GP Edition Technical Workshop Manual',
    model: 'APEX 890 GP',
    year: '2025/2026',
    fileSize: '16.8 MB',
    type: 'Repair & Workshop',
    downloadUrl: '#',
    description: 'Detailed torque specs, valve clearance inspection, clutch pack replacement, and electronic throttle synchronization.'
  },
  {
    id: 'man-apex-telemetry-ecu',
    title: 'Kinetic Performance Lab Bosch 9.3 MP Telemetry Protocol',
    model: 'All APEX Lineup',
    year: '2025',
    fileSize: '5.1 MB',
    type: 'Wiring Telemetry',
    downloadUrl: '#',
    description: 'CAN-bus data logging architecture, IMU 6D lean angle calibration, and Supermoto ABS logic specifications.'
  }
];

export interface ServiceInterval {
  mileageKm: number;
  months: number;
  name: string;
  tasks: string[];
}

export const SERVICE_SCHEDULE: ServiceInterval[] = [
  {
    mileageKm: 1000,
    months: 1,
    name: 'First Break-In Inspection (Essential)',
    tasks: [
      'Engine oil & dual micro-filter screen replacement',
      'Valve clearance initial check',
      'Chain slack and laser alignment check (5-7mm deflection)',
      'Chassis critical fasteners torque verification (50 Nm frame bolts)',
      'ECU software diagnostic scan and break-in limiter removal'
    ]
  },
  {
    mileageKm: 7500,
    months: 12,
    name: 'Standard Annual Service',
    tasks: [
      'Motorex Power Synt 4T 10W-50 oil replacement',
      'Air intake filter inspection and throttle body cleaning',
      'Brake fluid moisture check & DOT 5.1 flush if >2% moisture',
      'Coolant specific gravity & curved radiator airflow inspection',
      'Steering head bearing play inspection'
    ]
  },
  {
    mileageKm: 15000,
    months: 24,
    name: 'Major Valve & Chassis Service',
    tasks: [
      'Complete valve clearance shim check and adjustment',
      'Spark plug replacement (Laser Iridium LMAR9AI-8)',
      'WP APEX fork oil replacement (WP SAE 4)',
      'Fuel filter unit and pressure regulator replacement',
      'PASC slipper clutch friction plate wear measurement'
    ]
  }
];
