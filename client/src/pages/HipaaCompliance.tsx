import { ArrowLeft, Home, Shield, Lock, Eye, FileCheck, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import { Link } from 'wouter';

export default function HipaaCompliance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2" data-testid="button-home">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="/about-us">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-about">
                <ArrowLeft className="w-4 h-4" />
                About Us
              </Button>
            </Link>
          </div>
          <Badge variant="secondary" className="gap-2">
            <Shield className="w-3 h-3" />
            HIPAA Protected
          </Badge>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Lock className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-title">
            HIPAA Compliance
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-testid="text-subtitle">
            Protecting your health information with the highest standards of privacy and security
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span data-testid="text-last-updated">Last updated: September 15, 2025</span>
          </div>
        </div>

        {/* HIPAA Content */}
        <div className="space-y-6">
          {/* HIPAA Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                Our HIPAA Commitment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                As a home care provider, Butterfly Providers is committed to protecting your health information 
                in compliance with the Health Insurance Portability and Accountability Act (HIPAA) and other 
                applicable privacy laws.
              </p>
              <p className="text-gray-700 leading-relaxed">
                While we primarily provide non-medical home care services, we recognize that we may have 
                access to your protected health information (PHI) and take our responsibility to protect 
                this information very seriously.
              </p>
            </CardContent>
          </Card>

          {/* What is Protected Health Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-600" />
                Protected Health Information (PHI)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Protected Health Information includes any information about you that could identify you and 
                relates to your health condition, care, or payment for care. This may include:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Medical history and conditions</li>
                  <li>Medication lists and schedules</li>
                  <li>Care plans and assessments</li>
                  <li>Health insurance information</li>
                  <li>Emergency medical information</li>
                </ul>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Doctor and healthcare provider details</li>
                  <li>Hospital or clinic information</li>
                  <li>Mental health information</li>
                  <li>Dietary restrictions and allergies</li>
                  <li>Any health-related communications</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Protect PHI */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-600" />
                How We Protect Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Physical Safeguards</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Secure storage of all physical records and documents</li>
                  <li>Limited access to areas where PHI is stored</li>
                  <li>Proper disposal of documents containing PHI</li>
                  <li>Secure transportation of records when necessary</li>
                </ul>
                
                <h4 className="font-semibold text-gray-900">Administrative Safeguards</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Designated Privacy Officer responsible for HIPAA compliance</li>
                  <li>Regular HIPAA training for all staff members</li>
                  <li>Background checks for all employees with PHI access</li>
                  <li>Signed confidentiality agreements with all personnel</li>
                  <li>Regular audits of privacy practices and procedures</li>
                </ul>
                
                <h4 className="font-semibold text-gray-900">Technical Safeguards</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Encrypted storage and transmission of electronic PHI</li>
                  <li>Secure password policies and multi-factor authentication</li>
                  <li>Regular software updates and security patches</li>
                  <li>Restricted access to electronic systems containing PHI</li>
                  <li>Regular backup and disaster recovery procedures</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* When We May Share Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-600" />
                When We May Share Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We may use or disclose your protected health information for the following purposes:
                </p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">For Your Treatment and Care</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Coordinating care with your healthcare providers</li>
                    <li>Sharing information with our caregivers to ensure safe care</li>
                    <li>Communicating with family members you designate</li>
                    <li>Emergency situations to protect your health and safety</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">For Payment Purposes</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Processing insurance claims and authorizations</li>
                    <li>Billing and collection activities</li>
                    <li>Coordinating benefits with insurance providers</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">For Healthcare Operations</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Quality improvement and assurance activities</li>
                    <li>Training and education of our staff</li>
                    <li>Business planning and administration</li>
                    <li>Legal compliance and regulatory requirements</li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                  <p className="text-amber-800 font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Your Authorization Required
                  </p>
                  <p className="text-amber-700 mt-1">
                    For all other uses and disclosures, we will obtain your written authorization before 
                    sharing your protected health information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your HIPAA Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Rights Under HIPAA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">You have the following rights regarding your protected health information:</p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900">Right to Access</h4>
                  <p className="text-gray-700 text-sm">You may request to inspect and obtain copies of your health information.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Right to Amend</h4>
                  <p className="text-gray-700 text-sm">You may request corrections to your health information if you believe it is incorrect.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Right to Restrict</h4>
                  <p className="text-gray-700 text-sm">You may request restrictions on how we use or share your information.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Right to Request Alternative Communication</h4>
                  <p className="text-gray-700 text-sm">You may request that we communicate with you in a specific way or location.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Right to an Accounting</h4>
                  <p className="text-gray-700 text-sm">You may request a list of disclosures we have made of your information.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Right to File a Complaint</h4>
                  <p className="text-gray-700 text-sm">You may file a complaint if you believe your privacy rights have been violated.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Training */}
          <Card>
            <CardHeader>
              <CardTitle>Staff Training & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">All Butterfly Providers staff members receive comprehensive training on:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>HIPAA privacy and security requirements</li>
                <li>Proper handling of protected health information</li>
                <li>Recognizing and reporting privacy incidents</li>
                <li>Client rights and our obligations under HIPAA</li>
                <li>Secure communication and documentation practices</li>
                <li>Annual refresher training and updates</li>
              </ul>
            </CardContent>
          </Card>

          {/* Breach Notification */}
          <Card>
            <CardHeader>
              <CardTitle>Breach Notification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                In the unlikely event of a breach of your protected health information, we will:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Investigate and assess the scope of the breach immediately</li>
                <li>Take steps to mitigate any potential harm</li>
                <li>Notify you within 60 days of discovering the breach</li>
                <li>Report the breach to appropriate authorities as required</li>
                <li>Implement additional safeguards to prevent future incidents</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-indigo-50">
            <CardHeader>
              <CardTitle>Privacy Officer Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                For questions about this notice, your rights, or to file a complaint, contact our Privacy Officer:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Privacy Officer:</strong> Butterfly Providers Privacy Department</p>
                <p><strong>Phone:</strong> <a href="tel:602-830-0966" className="text-indigo-600 hover:underline">602-830-0966</a></p>
                <p><strong>Email:</strong> <a href="mailto:privacy@butterflyproviders.com" className="text-indigo-600 hover:underline">privacy@butterflyproviders.com</a></p>
                <p><strong>Address:</strong> 10720 West Indian School Rd., Phoenix, AZ 85037</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-indigo-200">
                <p className="text-gray-700 text-sm">
                  You may also file a complaint with the U.S. Department of Health and Human Services Office 
                  for Civil Rights. We will not retaliate against you for filing a complaint.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <Link href="/privacy-policy">
            <Button variant="outline" className="gap-2" data-testid="button-privacy">
              <Eye className="w-4 h-4" />
              Privacy Policy
            </Button>
          </Link>
          <Link href="/">
            <Button className="gap-2" data-testid="button-home-footer">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}