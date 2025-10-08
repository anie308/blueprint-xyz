"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BlueprintIcon, ArrowLeftIcon } from "@/components/icons"

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("overview")

  const sections = [
    { id: "overview", title: "Overview" },
    { id: "information-collection", title: "Information We Collect" },
    { id: "how-we-use", title: "How We Use Information" },
    { id: "information-sharing", title: "Information Sharing" },
    { id: "data-security", title: "Data Security" },
    { id: "cookies", title: "Cookies & Tracking" },
    { id: "user-rights", title: "Your Rights" },
    { id: "data-retention", title: "Data Retention" },
    { id: "international-transfers", title: "International Transfers" },
    { id: "children-privacy", title: "Children's Privacy" },
    { id: "california-privacy", title: "California Privacy Rights" },
    { id: "gdpr", title: "GDPR Compliance" },
    { id: "changes", title: "Changes to Privacy Policy" },
    { id: "contact", title: "Contact Us" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <BlueprintIcon className="w-8 h-8 text-primary group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">Blueprint</span>
                <span className="text-xs text-muted-foreground font-mono">.xyz</span>
              </div>
            </Link>
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-slate max-w-none">
              <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              {/* Overview */}
              {activeSection === "overview" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">1. Overview</h2>
                  <p>
                    At Blueprint.xyz ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our architectural community platform.
                  </p>
                  <p>
                    This Privacy Policy applies to all users of Blueprint.xyz, including visitors, registered users, and subscribers. By using our Service, you consent to the data practices described in this policy.
                  </p>
                  <p>
                    We are committed to transparency and will always be clear about how we use your information. If you have any questions about this Privacy Policy, please contact us at privacy@blueprint.xyz.
                  </p>
                </div>
              )}

              {/* Information Collection */}
              {activeSection === "information-collection" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">2. Information We Collect</h2>
                  
                  <h3 className="text-xl font-semibold">2.1 Information You Provide Directly</h3>
                  <p>We collect information you provide when you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Create an Account:</strong> Name, email address, username, password, and profile information</li>
                    <li><strong>Complete Your Profile:</strong> Bio, location, website, social media links, and professional information</li>
                    <li><strong>Upload Content:</strong> Projects, images, videos, documents, and portfolio items</li>
                    <li><strong>Participate in Discussions:</strong> Comments, posts, and messages in studios</li>
                    <li><strong>Contact Us:</strong> Support requests, feedback, and communications</li>
                    <li><strong>Apply for Jobs:</strong> Resume, cover letter, and application materials</li>
                  </ul>

                  <h3 className="text-xl font-semibold">2.2 Information We Collect Automatically</h3>
                  <p>When you use our Service, we automatically collect:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Usage Data:</strong> Pages visited, time spent, features used, and interactions</li>
                    <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers</li>
                    <li><strong>Location Data:</strong> General geographic location based on IP address</li>
                    <li><strong>Log Data:</strong> Server logs, error reports, and performance data</li>
                    <li><strong>Cookies and Similar Technologies:</strong> As described in our Cookies section</li>
                  </ul>

                  <h3 className="text-xl font-semibold">2.3 Information from Third Parties</h3>
                  <p>We may receive information from:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Social Media Platforms:</strong> When you connect your social media accounts</li>
                    <li><strong>Authentication Providers:</strong> When you sign in with Google, Twitter, or other services</li>
                    <li><strong>Analytics Services:</strong> Aggregated usage statistics and insights</li>
                    <li><strong>Public Sources:</strong> Information available in public records or directories</li>
                  </ul>
                </div>
              )}

              {/* How We Use Information */}
              {activeSection === "how-we-use" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">3. How We Use Information</h2>
                  
                  <h3 className="text-xl font-semibold">3.1 Service Provision</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Create and maintain your account and profile</li>
                    <li>Provide access to studios, discussions, and community features</li>
                    <li>Enable portfolio creation and sharing at blueprint.xyz/username</li>
                    <li>Facilitate messaging and communication between users</li>
                    <li>Process job applications and connect users with opportunities</li>
                    <li>Deliver personalized content and recommendations</li>
                  </ul>

                  <h3 className="text-xl font-semibold">3.2 Communication</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Send service-related notifications and updates</li>
                    <li>Respond to your inquiries and support requests</li>
                    <li>Send newsletters and marketing communications (with your consent)</li>
                    <li>Notify you about new features, studios, or job opportunities</li>
                    <li>Send security alerts and account-related information</li>
                  </ul>

                  <h3 className="text-xl font-semibold">3.3 Platform Improvement</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Analyze usage patterns to improve our Service</li>
                    <li>Develop new features and functionality</li>
                    <li>Conduct research and analytics</li>
                    <li>Monitor and prevent fraud, abuse, and security threats</li>
                    <li>Ensure compliance with our Terms of Service</li>
                  </ul>

                  <h3 className="text-xl font-semibold">3.4 Legal Compliance</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Comply with applicable laws and regulations</li>
                    <li>Respond to legal requests and court orders</li>
                    <li>Protect our rights and the rights of our users</li>
                    <li>Enforce our Terms of Service and community guidelines</li>
                  </ul>
                </div>
              )}

              {/* Information Sharing */}
              {activeSection === "information-sharing" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">4. Information Sharing</h2>
                  
                  <h3 className="text-xl font-semibold">4.1 Public Information</h3>
                  <p>The following information is visible to other users and the public:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your username and profile information you choose to make public</li>
                    <li>Content you post in public studios and discussions</li>
                    <li>Your portfolio at blueprint.xyz/username</li>
                    <li>Projects and work you choose to share publicly</li>
                    <li>Your participation in public discussions and comments</li>
                  </ul>

                  <h3 className="text-xl font-semibold">4.2 Service Providers</h3>
                  <p>We may share information with trusted third-party service providers who assist us in:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Hosting and infrastructure services</li>
                    <li>Email delivery and communication services</li>
                    <li>Analytics and performance monitoring</li>
                    <li>Payment processing and billing</li>
                    <li>Customer support and help desk services</li>
                    <li>Security and fraud prevention</li>
                  </ul>

                  <h3 className="text-xl font-semibold">4.3 Legal Requirements</h3>
                  <p>We may disclose information when required by law or to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Comply with legal processes or government requests</li>
                    <li>Protect our rights, property, or safety</li>
                    <li>Protect the rights, property, or safety of our users</li>
                    <li>Investigate or prevent fraud or security issues</li>
                    <li>Enforce our Terms of Service</li>
                  </ul>

                  <h3 className="text-xl font-semibold">4.4 Business Transfers</h3>
                  <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction. We will notify you of any such change in ownership or control.</p>
                </div>
              )}

              {/* Data Security */}
              {activeSection === "data-security" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">5. Data Security</h2>
                  
                  <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                  
                  <h3 className="text-xl font-semibold">5.1 Technical Safeguards</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Secure authentication and access controls</li>
                    <li>Regular security assessments and penetration testing</li>
                    <li>Secure coding practices and vulnerability management</li>
                    <li>Network security and intrusion detection systems</li>
                  </ul>

                  <h3 className="text-xl font-semibold">5.2 Administrative Safeguards</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Employee training on data protection and privacy</li>
                    <li>Access controls and role-based permissions</li>
                    <li>Regular security audits and compliance reviews</li>
                    <li>Incident response procedures and breach notification</li>
                    <li>Vendor management and third-party security assessments</li>
                  </ul>

                  <h3 className="text-xl font-semibold">5.3 Physical Safeguards</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Secure data centers with physical access controls</li>
                    <li>Environmental controls and disaster recovery procedures</li>
                    <li>Secure disposal of hardware and storage media</li>
                  </ul>

                  <p className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <strong>Important:</strong> While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we are committed to maintaining the highest standards of data protection.
                  </p>
                </div>
              )}

              {/* Cookies */}
              {activeSection === "cookies" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">6. Cookies & Tracking Technologies</h2>
                  
                  <p>We use cookies and similar tracking technologies to enhance your experience on our Service. This section explains how we use these technologies.</p>

                  <h3 className="text-xl font-semibold">6.1 Types of Cookies We Use</h3>
                  
                  <h4 className="text-lg font-medium">Essential Cookies</h4>
                  <p>These cookies are necessary for the Service to function properly:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Authentication and session management</li>
                    <li>Security and fraud prevention</li>
                    <li>Load balancing and performance optimization</li>
                  </ul>

                  <h4 className="text-lg font-medium">Functional Cookies</h4>
                  <p>These cookies enhance functionality and personalization:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Remembering your preferences and settings</li>
                    <li>Language and region selection</li>
                    <li>User interface customization</li>
                  </ul>

                  <h4 className="text-lg font-medium">Analytics Cookies</h4>
                  <p>These cookies help us understand how you use our Service:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Page views and user interactions</li>
                    <li>Feature usage and performance metrics</li>
                    <li>Error tracking and debugging</li>
                  </ul>

                  <h4 className="text-lg font-medium">Marketing Cookies</h4>
                  <p>These cookies are used for advertising and marketing purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Targeted advertising and content recommendations</li>
                    <li>Social media integration and sharing</li>
                    <li>Campaign tracking and conversion measurement</li>
                  </ul>

                  <h3 className="text-xl font-semibold">6.2 Managing Cookies</h3>
                  <p>You can control cookies through your browser settings. However, disabling certain cookies may affect the functionality of our Service.</p>
                  
                  <h3 className="text-xl font-semibold">6.3 Third-Party Services</h3>
                  <p>We may use third-party services that set their own cookies, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Google Analytics for website analytics</li>
                    <li>Social media platforms for sharing and authentication</li>
                    <li>Advertising networks for targeted advertising</li>
                    <li>Customer support tools for help desk functionality</li>
                  </ul>
                </div>
              )}

              {/* User Rights */}
              {activeSection === "user-rights" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">7. Your Rights</h2>
                  
                  <p>Depending on your location, you may have certain rights regarding your personal information. These rights may include:</p>

                  <h3 className="text-xl font-semibold">7.1 Access and Portability</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Request access to your personal information</li>
                    <li>Receive a copy of your data in a portable format</li>
                    <li>View your account information and activity history</li>
                  </ul>

                  <h3 className="text-xl font-semibold">7.2 Correction and Update</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Update your profile and account settings</li>
                    <li>Modify your privacy preferences</li>
                  </ul>

                  <h3 className="text-xl font-semibold">7.3 Deletion and Restriction</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Request deletion of your personal information</li>
                    <li>Restrict processing of your data</li>
                    <li>Object to certain uses of your information</li>
                  </ul>

                  <h3 className="text-xl font-semibold">7.4 Communication Preferences</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Opt out of marketing communications</li>
                    <li>Manage notification preferences</li>
                    <li>Control data sharing with third parties</li>
                  </ul>

                  <h3 className="text-xl font-semibold">7.5 Exercising Your Rights</h3>
                  <p>To exercise any of these rights, please contact us at privacy@blueprint.xyz. We will respond to your request within 30 days and may require verification of your identity.</p>
                </div>
              )}

              {/* Data Retention */}
              {activeSection === "data-retention" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">8. Data Retention</h2>
                  
                  <p>We retain your personal information for as long as necessary to provide our Service and fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>

                  <h3 className="text-xl font-semibold">8.1 Retention Periods</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Account Information:</strong> Until you delete your account or request deletion</li>
                    <li><strong>Content and Posts:</strong> Until you delete them or your account is deleted</li>
                    <li><strong>Messages:</strong> Until you delete them or your account is deleted</li>
                    <li><strong>Analytics Data:</strong> Aggregated and anonymized data may be retained indefinitely</li>
                    <li><strong>Legal Records:</strong> As required by applicable laws and regulations</li>
                  </ul>

                  <h3 className="text-xl font-semibold">8.2 Deletion Process</h3>
                  <p>When you delete your account or request deletion of your data:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We will delete your personal information from our active systems</li>
                    <li>Some information may be retained in backups for a limited time</li>
                    <li>Anonymized data may be retained for analytics and research purposes</li>
                    <li>We will notify you when the deletion process is complete</li>
                  </ul>
                </div>
              )}

              {/* International Transfers */}
              {activeSection === "international-transfers" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">9. International Data Transfers</h2>
                  
                  <p>Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws.</p>

                  <h3 className="text-xl font-semibold">9.1 Transfer Mechanisms</h3>
                  <p>We use appropriate safeguards for international transfers, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Standard Contractual Clauses approved by relevant authorities</li>
                    <li>Adequacy decisions by data protection authorities</li>
                    <li>Certification schemes and codes of conduct</li>
                    <li>Explicit consent where required by law</li>
                  </ul>

                  <h3 className="text-xl font-semibold">9.2 Data Processing Locations</h3>
                  <p>We may process your data in the following regions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>United States (primary processing location)</li>
                    <li>European Union (for EU users)</li>
                    <li>Other countries where our service providers operate</li>
                  </ul>
                </div>
              )}

              {/* Children's Privacy */}
              {activeSection === "children-privacy" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">10. Children's Privacy</h2>
                  
                  <p>Our Service is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18.</p>

                  <h3 className="text-xl font-semibold">10.1 Age Verification</h3>
                  <p>When you create an account, you must confirm that you are at least 18 years old. We may verify your age through various means.</p>

                  <h3 className="text-xl font-semibold">10.2 If We Learn We Have Collected Information from a Child</h3>
                  <p>If we discover that we have collected personal information from a child under 18, we will:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Immediately delete the information from our systems</li>
                    <li>Take steps to prevent future collection</li>
                    <li>Notify parents or guardians if required by law</li>
                    <li>Cooperate with relevant authorities as necessary</li>
                  </ul>

                  <h3 className="text-xl font-semibold">10.3 Parental Rights</h3>
                  <p>If you are a parent or guardian and believe your child has provided us with personal information, please contact us at privacy@blueprint.xyz.</p>
                </div>
              )}

              {/* California Privacy Rights */}
              {activeSection === "california-privacy" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">11. California Privacy Rights (CCPA)</h2>
                  
                  <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA).</p>

                  <h3 className="text-xl font-semibold">11.1 Right to Know</h3>
                  <p>You have the right to know:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>What personal information we collect</li>
                    <li>How we use your personal information</li>
                    <li>Whether we sell or disclose your personal information</li>
                    <li>Who we share your personal information with</li>
                  </ul>

                  <h3 className="text-xl font-semibold">11.2 Right to Delete</h3>
                  <p>You have the right to request deletion of your personal information, subject to certain exceptions.</p>

                  <h3 className="text-xl font-semibold">11.3 Right to Opt-Out</h3>
                  <p>You have the right to opt-out of the sale of your personal information. We do not sell personal information.</p>

                  <h3 className="text-xl font-semibold">11.4 Right to Non-Discrimination</h3>
                  <p>We will not discriminate against you for exercising your privacy rights.</p>

                  <h3 className="text-xl font-semibold">11.5 Exercising Your Rights</h3>
                  <p>To exercise your California privacy rights, contact us at privacy@blueprint.xyz or call our toll-free number: 1-800-BLUEPRINT.</p>
                </div>
              )}

              {/* GDPR Compliance */}
              {activeSection === "gdpr" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">12. GDPR Compliance (EU Users)</h2>
                  
                  <p>If you are in the European Union, we comply with the General Data Protection Regulation (GDPR).</p>

                  <h3 className="text-xl font-semibold">12.1 Legal Basis for Processing</h3>
                  <p>We process your personal data based on:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Consent:</strong> When you agree to our processing of your data</li>
                    <li><strong>Contract:</strong> To provide our Service under our Terms of Service</li>
                    <li><strong>Legitimate Interest:</strong> To improve our Service and prevent fraud</li>
                    <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
                  </ul>

                  <h3 className="text-xl font-semibold">12.2 Data Protection Officer</h3>
                  <p>Our Data Protection Officer can be contacted at dpo@blueprint.xyz.</p>

                  <h3 className="text-xl font-semibold">12.3 Supervisory Authority</h3>
                  <p>You have the right to lodge a complaint with your local data protection authority if you believe we have violated your rights under GDPR.</p>
                </div>
              )}

              {/* Changes to Privacy Policy */}
              {activeSection === "changes" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">13. Changes to This Privacy Policy</h2>
                  
                  <p>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws.</p>

                  <h3 className="text-xl font-semibold">13.1 Notification of Changes</h3>
                  <p>When we make material changes to this Privacy Policy, we will:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Post the updated policy on our website</li>
                    <li>Send you an email notification (if you have provided an email address)</li>
                    <li>Display a prominent notice on our Service</li>
                    <li>Update the "Last updated" date at the top of this policy</li>
                  </ul>

                  <h3 className="text-xl font-semibold">13.2 Your Continued Use</h3>
                  <p>Your continued use of our Service after any changes to this Privacy Policy constitutes your acceptance of the updated policy.</p>

                  <h3 className="text-xl font-semibold">13.3 Significant Changes</h3>
                  <p>For significant changes, we will provide at least 30 days' notice before the changes take effect, giving you time to review and decide whether to continue using our Service.</p>
                </div>
              )}

              {/* Contact Information */}
              {activeSection === "contact" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">14. Contact Us</h2>
                  
                  <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>

                  <div className="bg-muted p-6 rounded-lg space-y-4">
                    <div>
                      <h3 className="font-semibold">Privacy Team</h3>
                      <p>Email: privacy@blueprint.xyz</p>
                      <p>Phone: 1-800-BLUEPRINT</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">Data Protection Officer (EU Users)</h3>
                      <p>Email: dpo@blueprint.xyz</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">Mailing Address</h3>
                      <p>Blueprint.xyz Privacy Team</p>
                      <p>1234 Architecture Lane</p>
                      <p>San Francisco, CA 94102</p>
                      <p>United States</p>
                    </div>
                  </div>

                  <p>We will respond to your inquiry within 5-7 business days.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
