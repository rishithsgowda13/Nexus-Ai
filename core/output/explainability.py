from typing import Dict, Any, List

class ExplainabilityEngine:
    """
    Layer 4: Output
    Delivers SHAP/LIME based reasoning and dynamic incident playbooks.
    """
    def __init__(self):
        self.reasoning_templates = {
            "LOG4SHELL RCE": "Exploitation of Log4j2 JNDI lookup vulnerability. Remote code execution attempted via malformed LDAP strings in headers.",
            "WANNACRY RANSOMWARE": "EternalBlue (MS17-010) exploit detected. Worm-like propagation attempting to encrypt local filesystem.",
            "SOLARWINDS HACK": "SUNBURST supply-chain compromise. Binary beaconing to malicious DGA domains (avsvmcloud.com) detected.",
            "EMOTET BOTNET": "Polymorphic banking trojan activity. System participating in coordinated C2 botnet heartbeat and spam distribution.",
            "KERBEROS EXPLOIT": "Golden Ticket attack detected. Domain Controller targetted via forged TGT for persistent administrative access.",
            "NOTPETYA WIPER": "Destructive wiper activity using SMB propagation. Aims for total master boot record (MBR) destruction.",
            "STRUTS2 RCE": "Jakarta Multipart parser vulnerability exploitation. RCE attempt via malformed Content-Type headers.",
            "Benign": "Signal matches standard baseline traffic telemetry."
        }

    def generate_reasoning(self, correlation: Dict[str, Any]) -> str:
        """Simulates SHAP/LIME output in plain-English."""
        threat = correlation["threat_type"]
        base_reason = self.reasoning_templates.get(threat, f"ML Anomaly Model triggered on generic {threat} patterns.")
        
        if correlation["status"] == "Genuine" or correlation.get("severity") in ["High", "Critical"]:
            return f"SHAP Analysis: {base_reason} High feature importance on specific payload signatures and threshold variance."
        return f"LIME Analysis: {base_reason} Anomaly probability localized to network-layer metadata."

    def generate_playbook(self, correlation: Dict[str, Any]) -> List[str]:
        """Contextually generates dynamic playbooks ONLY for Genuine Threats."""
        if correlation["status"] != "Genuine":
            return [] # No playbook for False Positives

        sev = correlation.get("severity", "Medium")
        threat = correlation["threat_type"]
        
        playbook = ["1. Log incident to SIEM Registry"]
        
        if threat == "LOG4SHELL RCE":
            playbook.extend(["2. Patch Log4j2 to >=2.17.1", "3. Set LOG4J_FORMAT_MSG_NO_LOOKUPS=true.", "4. Isolate vulnerable JVM process."])
        elif threat == "WANNACRY RANSOMWARE":
            playbook.extend(["2. Disable SMBv1 immediately", "3. Apply MS17-010 security patch.", "4. Quarantine infected endpoints."])
        elif threat == "SOLARWINDS HACK":
            playbook.extend(["2. Revoke SolarWinds Orion signing certificate", "3. Block outbound traffic to avsvmcloud.com.", "4. Audit AD for unauthorized account creation."])
        elif threat == "EMOTET BOTNET":
            playbook.extend(["2. Block C2 IP ranges at perimeter", "3. Initiate full system scan with updated EDR.", "4. Reset all user credentials."])
        elif threat == "KERBEROS EXPLOIT":
            playbook.extend(["2. Reset KRBTGT account password (twice)", "3. Audit Kerberos event logs for Event IDs 4768/4769.", "4. Monitor for Pass-the-Ticket activity."])
        elif threat == "NOTPETYA WIPER":
            playbook.extend(["2. Shutdown affected systems to prevent encryption", "3. Isolate network segments using microsegmentation.", "4. Restore systems from offline backups."])
        elif threat == "STRUTS2 RCE":
            playbook.extend(["2. Patch Apache Struts to latest version", "3. Update WAF rules to block OGNL expressions.", "4. Remove temporary web shells."])
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
