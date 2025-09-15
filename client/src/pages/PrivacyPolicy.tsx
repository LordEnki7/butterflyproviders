import { ArrowLeft, Home, Shield, Eye, Lock, UserCheck, FileText, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import { Link } from 'wouter';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
            Legal Document
          </Badge>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-title">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-testid="text-subtitle">
            Your privacy and the security of your personal information is our highest priority
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span data-testid="text-last-updated">Last updated: September 15, 2025</span>
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Our Commitment to Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                At Butterfly Providers, we understand that your personal and health information is sensitive and private. 
                This Privacy Policy explains how we collect, use, protect, and disclose your information when you use our 
                non-medical home care services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We are committed to maintaining the confidentiality and security of your personal information in accordance 
                with state and federal privacy laws, including HIPAA where applicable.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Name, address, phone number, and email address</li>
                    <li>Date of birth and emergency contact information</li>
                    <li>Insurance information and payment details</li>
                    <li>Care preferences and special needs</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Health Information</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>General health status and mobility information</li>
                    <li>Medication reminders and dietary restrictions</li>
                    <li>Care plans and service notes</li>
                    <li>Incident reports and care updates</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Service Information</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Service schedules and caregiver assignments</li>
                    <li>Billing information and payment history</li>
                    <li>Communication logs and service updates</li>
                    <li>Quality assurance and satisfaction surveys</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-purple-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide and coordinate your home care services</li>
                <li>Communicate with you about your care plan and schedule changes</li>
                <li>Process payments and handle billing inquiries</li>
                <li>Ensure quality care through supervision and monitoring</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Improve our services and train our caregivers</li>
                <li>Contact you for appointment confirmations and reminders</li>
                <li>Respond to emergencies and ensure your safety</li>
              </ul>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-600" />
                When We Share Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information. We may share your information only in these circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>With your caregivers:</strong> To provide safe and effective care</li>
                <li><strong>Healthcare providers:</strong> With your consent, to coordinate care</li>
                <li><strong>Insurance companies:</strong> For billing and authorization purposes</li>
                <li><strong>Legal requirements:</strong> When required by law or court order</li>
                <li><strong>Emergency situations:</strong> To protect your health and safety</li>
                <li><strong>Business partners:</strong> Service providers who help us operate (under strict confidentiality)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Security Measures */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                How We Protect Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Secure, encrypted storage of all digital records</li>
                <li>Regular security training for all staff members</li>
                <li>Background checks for all caregivers and employees</li>
                <li>Confidentiality agreements with all personnel</li>
                <li>Limited access to information on a need-to-know basis</li>
                <li>Regular security audits and system updates</li>
                <li>Secure disposal of physical and electronic records</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate information</li>
                <li>Request restrictions on how we use your information</li>
                <li>Receive a copy of your records in electronic format</li>
                <li>File a complaint about our privacy practices</li>
                <li>Revoke consent for certain uses (where legally permitted)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-blue-50">
            <CardHeader>
              <CardTitle>Questions About Privacy?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Phone:</strong> <a href="tel:602-830-0966" className="text-blue-600 hover:underline">602-830-0966</a></p>
                <p><strong>Email:</strong> <a href="mailto:privacy@butterflyproviders.com" className="text-blue-600 hover:underline">privacy@butterflyproviders.com</a></p>
                <p><strong>Address:</strong> 10720 West Indian School Rd., Phoenix, AZ 85037</p>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Policy Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any material changes 
                by posting the new Privacy Policy on our website and updating the "Last updated" date. 
                Your continued use of our services after such modifications constitutes your acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <Link href="/about-us">
            <Button variant="outline" className="gap-2" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              About Us
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