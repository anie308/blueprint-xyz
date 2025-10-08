"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BlueprintIcon, ArrowLeftIcon } from "@/components/icons"

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("overview")

  const sections = [
    { id: "overview", title: "Overview" },
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "description", title: "Service Description" },
    { id: "user-accounts", title: "User Accounts" },
    { id: "content", title: "User Content" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "prohibited-uses", title: "Prohibited Uses" },
    { id: "privacy", title: "Privacy" },
    { id: "termination", title: "Termination" },
    { id: "disclaimers", title: "Disclaimers" },
    { id: "limitation", title: "Limitation of Liability" },
    { id: "governing-law", title: "Governing Law" },
    { id: "changes", title: "Changes to Terms" },
    { id: "contact", title: "Contact Information" }
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
              <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              {/* Overview */}
              {activeSection === "overview" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">1. Overview</h2>
                  <p>
                    Welcome to Blueprint.xyz ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website located at blueprint.xyz (the "Service") operated by Blueprint.xyz.
                  </p>
                  <p>
                    Blueprint.xyz is a digital community platform designed exclusively for architects and designers. Our platform merges Reddit-style discussions, Reels for visual inspiration, and Behance-style portfolios under one roof.
                  </p>
                  <p>
                    By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
                  </p>
                </div>
              )}

              {/* Acceptance of Terms */}
              {activeSection === "acceptance" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">2. Acceptance of Terms</h2>
                  <p>
                    By creating an account, accessing, or using Blueprint.xyz, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                  </p>
                  <p>
                    You must be at least 18 years old to use our Service. If you are under 18, you may not use our Service or provide any personal information to us.
                  </p>
                  <p>
                    If you are using our Service on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
                  </p>
                </div>
              )}

              {/* Service Description */}
              {activeSection === "description" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">3. Service Description</h2>
                  <p>
                    Blueprint.xyz provides a comprehensive platform for architects and designers that includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Studios:</strong> Topic-based discussion communities for architectural topics</li>
                    <li><strong>Reels:</strong> Short-form video content sharing for project showcases</li>
                    <li><strong>Portfolio Profiles:</strong> Personal portfolio pages accessible at blueprint.xyz/username</li>
                    <li><strong>Messaging:</strong> Direct communication between community members</li>
                    <li><strong>Job Board:</strong> Architecture and design job postings</li>
                    <li><strong>Project Sharing:</strong> Upload and share architectural projects and designs</li>
                  </ul>
                  <p>
                    We reserve the right to modify, suspend, or discontinue any part of our Service at any time with or without notice.
                  </p>
                </div>
              )}

              {/* User Accounts */}
              {activeSection === "user-accounts" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">4. User Accounts</h2>
                  <p>
                    To access certain features of our Service, you must create an account. You are responsible for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Providing accurate, current, and complete information during registration</li>
                    <li>Maintaining the security of your password and account</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized use of your account</li>
                  </ul>
                  <p>
                    You may not create multiple accounts or use another person's account without permission. We reserve the right to suspend or terminate accounts that violate these Terms.
                  </p>
                  <p>
                    Your username will be displayed publicly and will be used in your portfolio URL (blueprint.xyz/username). Choose your username carefully as it cannot be easily changed.
                  </p>
                </div>
              )}

              {/* User Content */}
              {activeSection === "content" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">5. User Content</h2>
                  <p>
                    You retain ownership of all content you post, upload, or share on our Service ("User Content"). However, by posting User Content, you grant us a non-exclusive, royalty-free, worldwide license to use, display, and distribute your content in connection with our Service.
                  </p>
                  <p>
                    You are solely responsible for your User Content and must ensure that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You own or have the right to post the content</li>
                    <li>The content does not violate any third-party rights</li>
                    <li>The content is accurate and not misleading</li>
                    <li>The content complies with our community guidelines</li>
                  </ul>
                  <p>
                    We reserve the right to remove any User Content that violates these Terms or our community guidelines. We are not obligated to monitor User Content but may do so at our discretion.
                  </p>
                </div>
              )}

              {/* Intellectual Property */}
              {activeSection === "intellectual-property" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">6. Intellectual Property</h2>
                  <p>
                    The Service and its original content, features, and functionality are owned by Blueprint.xyz and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                  </p>
                  <p>
                    Our trademarks include but are not limited to "Blueprint.xyz," the Blueprint logo, and related marks. You may not use our trademarks without our prior written consent.
                  </p>
                  <p>
                    If you believe your intellectual property rights have been violated, please contact us at legal@blueprint.xyz with a detailed description of the alleged infringement.
                  </p>
                </div>
              )}

              {/* Prohibited Uses */}
              {activeSection === "prohibited-uses" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">7. Prohibited Uses</h2>
                  <p>
                    You may not use our Service for any unlawful purpose or to solicit others to perform unlawful acts. Prohibited activities include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violating any applicable laws or regulations</li>
                    <li>Infringing on intellectual property rights</li>
                    <li>Harassing, abusing, or harming other users</li>
                    <li>Posting false, misleading, or defamatory content</li>
                    <li>Spamming or sending unsolicited communications</li>
                    <li>Attempting to gain unauthorized access to our systems</li>
                    <li>Using automated systems to access the Service</li>
                    <li>Impersonating another person or entity</li>
                    <li>Sharing content that is pornographic, violent, or otherwise inappropriate</li>
                    <li>Engaging in any activity that disrupts or interferes with the Service</li>
                  </ul>
                </div>
              )}

              {/* Privacy */}
              {activeSection === "privacy" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">8. Privacy</h2>
                  <p>
                    Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.
                  </p>
                  <p>
                    We may collect information about you when you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Create an account</li>
                    <li>Post content or interact with other users</li>
                    <li>Use our messaging features</li>
                    <li>Upload projects or portfolio items</li>
                    <li>Participate in studios or discussions</li>
                  </ul>
                  <p>
                    We use this information to provide, maintain, and improve our Service, communicate with you, and ensure the security of our platform.
                  </p>
                </div>
              )}

              {/* Termination */}
              {activeSection === "termination" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">9. Termination</h2>
                  <p>
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                  </p>
                  <p>
                    Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service or contact us to delete your account.
                  </p>
                  <p>
                    All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                  </p>
                </div>
              )}

              {/* Disclaimers */}
              {activeSection === "disclaimers" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">10. Disclaimers</h2>
                  <p>
                    The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, this Company:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Excludes all representations and warranties relating to this Service and its contents</li>
                    <li>Excludes all liability for damages arising out of or in connection with your use of this Service</li>
                    <li>Does not warrant that the Service will be available at all times or be free from errors</li>
                    <li>Does not guarantee the accuracy, completeness, or reliability of any content</li>
                  </ul>
                  <p>
                    This disclaimer applies to the fullest extent permitted by law and shall survive any termination of these Terms.
                  </p>
                </div>
              )}

              {/* Limitation of Liability */}
              {activeSection === "limitation" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">11. Limitation of Liability</h2>
                  <p>
                    In no event shall Blueprint.xyz, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                  </p>
                  <p>
                    Our total liability to you for all damages shall not exceed the amount you paid us for the Service in the 12 months preceding the claim, or $100, whichever is greater.
                  </p>
                  <p>
                    Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, so the above limitations or exclusions may not apply to you.
                  </p>
                </div>
              )}

              {/* Governing Law */}
              {activeSection === "governing-law" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">12. Governing Law</h2>
                  <p>
                    These Terms shall be interpreted and governed by the laws of the State of California, United States, without regard to its conflict of law provisions.
                  </p>
                  <p>
                    Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                  </p>
                  <p>
                    Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
                  </p>
                </div>
              )}

              {/* Changes to Terms */}
              {activeSection === "changes" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">13. Changes to Terms</h2>
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                  <p>
                    What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                  </p>
                  <p>
                    If you do not agree to the new terms, please stop using the Service and contact us to delete your account.
                  </p>
                </div>
              )}

              {/* Contact Information */}
              {activeSection === "contact" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">14. Contact Information</h2>
                  <p>
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-muted p-6 rounded-lg">
                    <p><strong>Email:</strong> legal@blueprint.xyz</p>
                    <p><strong>Address:</strong> Blueprint.xyz Legal Department</p>
                    <p>1234 Architecture Lane</p>
                    <p>San Francisco, CA 94102</p>
                    <p>United States</p>
                  </div>
                  <p>
                    We will respond to your inquiry within 5-7 business days.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
