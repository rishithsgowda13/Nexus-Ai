from typing import Dict, Any, List

class ExplainabilityEngine:
    """
    Layer 4: Output
    Delivers SHAP/LIME based reasoning and dynamic incident playbooks.
    """
    def __init__(self):
        self.reasoning_templates = {
            "BRUTE FORCE": "Repeated login attempt burst detected. Temporal spacing indicates automated credential stuffing.",
            "LATERAL MOVEMENT": "SMB traffic detected using administrative pass-the-hash patterns across internal segments.",
            "DATA EXFILTRATION": "Massive outbound byte transfer to external unverified IP via TCP.",
            "C2 BEACONING": "Encrypted HTTPS heartbeat pattern matching known Cobalt Strike/Metasploit intervals.",
            "PORT SCAN": "Sequential SYN packets across multiple destination ports in under 100ms interval.",
            "SQL INJECTION": "HTTP requests containing UNION SELECT and malformed SQL queries on input fields.",
            "DDoS": "Volumetric threshold breached. Source IP exhibits repetitive SYN-ack patterns.",
            "Infiltration": "Unauthorized process 'cmd.exe' spawned following a network anomaly in Layer 3.",
            "Benign": "Signal matches standard baseline traffic telemetry."
        }

    def generate_reasoning(self, correlation: Dict[str, Any]) -> str:
        """Simulates SHAP/LIME output in plain-English."""
        threat = correlation["threat_type"]
        base_reason = self.reasoning_templates.get(threat, f"ML Anomaly Model triggered on generic {threat} patterns.")
        
        if correlation["status"] == "Genuine" or correlation["severity"] in ["High", "Critical"]:
            return f"SHAP Analysis: {base_reason} High feature importance on specific payload signatures and threshold variance."
        return f"LIME Analysis: {base_reason} Anomaly probability localized to network-layer metadata."

    def generate_playbook(self, correlation: Dict[str, Any]) -> List[str]:
        """Contextually generates dynamic playbooks ONLY for Genuine Threats."""
        if correlation["status"] != "Genuine":
            return [] # No playbook for False Positives

        sev = correlation["severity"]
        threat = correlation["threat_type"]
        
        playbook = ["1. Log incident to SIEM Registry"]
        
        if threat == "BRUTE FORCE":
            playbook.extend(["2. Blacklist source IP at Edge Firewall", "3. Force password reset for target account."])
        elif threat == "LATERAL MOVEMENT":
            playbook.extend(["2. Disable compromised NTLM hashes", "3. Isolate affected network segment."])
        elif threat == "DATA EXFILTRATION":
            playbook.extend(["2. Block outbound IP connection", "3. Initiate DPI (Deep Packet Inspection)."])
        elif threat == "C2 BEACONING":
            playbook.extend(["2. Drop outbound C2 traffic via DNS sinkhole", "3. Quarantine localized host."])
        elif threat == "PORT SCAN":
            playbook.extend(["2. Add dynamic firewall drop rule for Source IP", "3. Increase edge logging verbosity."])
        elif threat == "SQL INJECTION":
            playbook.extend(["2. Enable WAF strict query filtering", "3. Patch vulnerable database input controllers."])
        elif threat == "DDoS":
            playbook.extend(["2. Enable CloudFlare high-security mode", "3. Rate-limit source IP at Edge Firewall"])
        elif threat == "Infiltration":
            playbook.extend(["2. Isolate infected host process", "3. Reset user access tokens"])
        else:
            playbook.extend(["2. Isolate suspicious traffic", "3. Initiate deep forensic audit"])
        
        if sev in ["High", "Critical"]:
            playbook.append("4. ESCALATE to Level 2 Incident Responder (Tier II)")
        else:
            playbook.append("4. Monitor telemetry for further drift")
            
        return playbook

    def finalize_alert(self, correlation: Dict[str, Any]) -> Dict[str, Any]:
        """Ranks incidents for analyst prioritization."""
        reasoning = self.generate_reasoning(correlation)
        playbook = self.generate_playbook(correlation)
        
        return {
            "alert": correlation,
            "explainability": reasoning,
            "playbook": playbook,
            "priority": "P1" if correlation["severity"] == "Critical" else "P3"
        }
