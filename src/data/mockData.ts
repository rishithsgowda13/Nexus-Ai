import { v4 as uuidv4 } from 'uuid';

export type AlertSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type ThreatCategory = 'Brute Force' | 'Lateral Movement' | 'Data Exfiltration' | 'C2 Beaconing' | 'False Positive';

export interface ThreatAlert {
  id: string;
  timestamp: string;
  category: ThreatCategory;
  severity: AlertSeverity;
  sourceIp: string;
  destinationIp: string;
  confidence: number;
  layers: ('Network' | 'Endpoint' | 'Application')[];
  description: string;
  explainability: string;
  playbook: string[];
}

export const initialThreats: ThreatAlert[] = [
  {
    id: uuidv4(),
    timestamp: new Date(Date.now() - 10000).toISOString(),
    category: 'Brute Force',
    severity: 'High',
    sourceIp: '192.168.1.105',
    destinationIp: '10.0.0.50 (Auth Server)',
    confidence: 94,
    layers: ['Network', 'Application'],
    description: 'Repeated failed authentication attempts detected from a single source towards internal authentication server over HTTP/API.',
    explainability: 'The system observed 450 failed login attempts within 2 minutes matching known credential stuffing tools. The network layer recorded an unusual spike in connection duration, perfectly correlated with HTTP 401 Unauthorized responses at the application layer.',
    playbook: [
      'Block source IP 192.168.1.105 at the perimeter firewall.',
      'Enforce multi-factor authentication (MFA) across all active sessions.',
      'Audit logs for successful logins originating from this IP in the past 24 hours.',
      'Reset credentials for any successfully breached accounts.'
    ]
  },
  {
    id: uuidv4(),
    timestamp: new Date(Date.now() - 25000).toISOString(),
    category: 'C2 Beaconing',
    severity: 'Critical',
    sourceIp: '10.0.0.22 (DB Server)',
    destinationIp: '185.15.22.14 (External)',
    confidence: 98,
    layers: ['Network', 'Endpoint'],
    description: 'Periodic, low-volume connections to known malicious external IP at regular intervals.',
    explainability: 'Network flow logs show 50-byte packets sent exactly every 300 seconds to 185.15.22.14 over port 443. Endpoint execution logs confirm a hidden powershell.exe process spawned with no parent PID, directly originating this traffic. This behavior is highly symptomatic of Cobalt Strike beaconing.',
    playbook: [
      'Isolate DB Server (10.0.0.22) from the network immediately via EDR platform.',
      'Capture memory dump of the affected server for forensic analysis.',
      'Block destination IP 185.15.22.14 across all corporate firewalls.',
      'Investigate the initial compromise vector (check incoming application logs from 48 hours prior).'
    ]
  },
  {
    id: uuidv4(),
    timestamp: new Date(Date.now() - 45000).toISOString(),
    category: 'False Positive',
    severity: 'High',
    sourceIp: '10.0.0.12 (Admin Workstation)',
    destinationIp: '13.107.136.9 (Cloud Storage)',
    confidence: 72,
    layers: ['Network', 'Endpoint'],
    description: 'Abnormally large outbound data transfer resembling data exfiltration.',
    explainability: 'High-volume outbound traffic detected (50GB transferred within 10 minutes) over HTTPS. However, endpoint logs confirm the originating process is legitimate AWS CLI executed by an authorized IAM role under an administrator account during approved backup hours. This is an administrative bulk file transfer falsely triggering the generic volume threshold.',
    playbook: [
      'Acknowledge the alert and classify it as a false positive.',
      'Update baseline threshold profiles for Admin Workspace subnet between 2:00 AM - 4:00 AM.',
      'Verify the transfer destination matches the company\'s official cloud backup storage IP range.',
      'No immediate isolation required.'
    ]
  },
  {
    id: uuidv4(),
    timestamp: new Date(Date.now() - 120000).toISOString(),
    category: 'Lateral Movement',
    severity: 'High',
    sourceIp: '10.0.0.75 (Compromised Host)',
    destinationIp: '10.0.0.100-150 (Subnet Scan)',
    confidence: 88,
    layers: ['Network', 'Endpoint'],
    description: 'Unusual internal traffic patterns between endpoints after an initial baseline violation.',
    explainability: 'Endpoint log shows execution of WMI commands executing remotely. Network logs demonstrate sequential port scanning on internal subnet (Ports 445, 3389) originating from the same host. This combination indicates lateral movement typically used to find internal administrative servers.',
    playbook: [
      'Segment the 10.0.0.x subnet to restrict inter-host communication (Private VLAN).',
      'Terminate the offending WMI processes on 10.0.0.75 using EDR response actions.',
      'Flag the parent process on 10.0.0.75 for investigation.'
    ]
  }
];

export const generateRandomEvent = (): Partial<ThreatAlert> => {
  const categories: ThreatCategory[] = ['Brute Force', 'Lateral Movement', 'Data Exfiltration', 'C2 Beaconing'];
  const sevs: AlertSeverity[] = ['Low', 'Medium'];
  return {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    category: categories[Math.floor(Math.random() * categories.length)],
    severity: sevs[Math.floor(Math.random() * sevs.length)],
    sourceIp: `192.168.1.${Math.floor(Math.random() * 255)}`,
    destinationIp: `10.0.0.${Math.floor(Math.random() * 255)}`,
    confidence: Math.floor(Math.random() * 40) + 40,
    layers: ['Network'],
  };
};
