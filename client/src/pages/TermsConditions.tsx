import { ArrowLeft, Home, FileText, AlertTriangle, Shield, Clock, Scale, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import { Link } from 'wouter';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
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
            <Scale className="w-3 h-3" />
            Legal Terms
          </Badge>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-title">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-testid="text-subtitle">
            Important terms governing your use of our home care services
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span data-testid="text-last-updated">Last updated: September 15, 2025</span>
          </div>
        </div>

        {/* Terms Content */}
        <div className="space-y-6">
          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                By engaging our services, you agree to be bound by these Terms and Conditions. These terms constitute 
                a legally binding agreement between you (the "Client") and Butterfly Providers (the "Company").
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you do not agree with any part of these terms, please do not use our services.
              </p>
            </CardContent>
          </Card>

          {/* Services Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Our Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Butterfly Providers offers non-medical home care services including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Personal care assistance (bathing, grooming, dressing)</li>
                  <li>Companionship and social interaction</li>
                  <li>Light housekeeping and meal preparation</li>
                  <li>Transportation to appointments and errands</li>
                  <li>Medication reminders (non-medical)</li>
                  <li>Dementia and Alzheimer's support</li>
                  <li>Respite care for family caregivers</li>
                </ul>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-yellow-800 font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Important Notice
                  </p>
                  <p className="text-yellow-700 mt-1">
                    We do NOT provide medical or nursing services. Our caregivers are not licensed medical professionals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>Client Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">As a client, you agree to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate and complete information about your care needs</li>
                <li>Maintain a safe environment for our caregivers</li>
                <li>Treat our staff with respect and courtesy</li>
                <li>Pay all fees according to the agreed payment schedule</li>
                <li>Provide at least 24 hours notice for schedule changes when possible</li>
                <li>Report any incidents or concerns promptly to management</li>
                <li>Allow access to your home during scheduled service times</li>
                <li>Inform us of any changes to your health condition or care needs</li>
              </ul>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Payment is due according to your service agreement</li>
                  <li>We accept cash, check, credit cards, and direct pay arrangements</li>
                  <li>Late payment fees may apply for overdue accounts</li>
                  <li>Services may be suspended for non-payment after 30 days</li>
                  <li>You are responsible for any bank fees related to returned payments</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">Insurance & Third-Party Payment</p>
                  <p className="text-blue-700 mt-1">
                    We work with many insurance providers and can assist with long-term care benefits. 
                    Payment approval is subject to your insurance provider's terms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cancellation Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Cancellation & Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>24-hour notice required for service cancellations to avoid fees</li>
                <li>Emergency cancellations are accepted without penalty</li>
                <li>Recurring services may be modified with 48-hour notice</li>
                <li>Either party may terminate services with 7 days written notice</li>
                <li>Unused prepaid services are refundable upon termination</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                For detailed cancellation policies, please see our 
                <Link href="/cancellation-policies" className="text-blue-600 hover:underline"> Cancellation Policies page</Link>.
              </p>
            </CardContent>
          </Card>

          {/* Liability and Insurance */}
          <Card>
            <CardHeader>
              <CardTitle>Liability & Insurance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Butterfly Providers carries comprehensive liability insurance</li>
                  <li>All caregivers are bonded and covered by workers' compensation</li>
                  <li>We are not liable for pre-existing medical conditions</li>
                  <li>Clients are responsible for maintaining homeowner's/renter's insurance</li>
                  <li>We are not responsible for personal property loss or damage</li>
                  <li>Emergency medical decisions remain with client and family</li>
                </ul>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">Licensed & Insured</p>
                  <p className="text-green-700 mt-1">
                    We are fully licensed as a non-medical home care provider in Arizona and 
                    maintain all required insurance coverage for your protection.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Confidentiality */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Confidentiality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We maintain strict confidentiality of all client information in accordance with applicable privacy laws. 
                For complete details, please review our 
                <Link href="/privacy-policy" className="text-blue-600 hover:underline"> Privacy Policy</Link>.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>All staff sign confidentiality agreements</li>
                <li>Information is shared only as necessary for care provision</li>
                <li>Client consent required for information sharing with third parties</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, Butterfly Providers' liability is limited to the amount 
                paid for services in the 30 days preceding any incident.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>Our responsibility is limited to providing competent non-medical care</li>
                <li>Clients assume responsibility for medical care decisions</li>
                <li>We recommend clients maintain appropriate medical coverage</li>
              </ul>
            </CardContent>
          </Card>

          {/* Modifications */}
          <Card>
            <CardHeader>
              <CardTitle>Modifications to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be 
                effective upon posting to our website with an updated "Last updated" date. Continued 
                use of our services constitutes acceptance of the modified terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-green-50">
            <CardHeader>
              <CardTitle>Questions About These Terms?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Phone:</strong> <a href="tel:602-830-0966" className="text-blue-600 hover:underline">602-830-0966</a></p>
                <p><strong>Email:</strong> <a href="mailto:contactus@butterflyproviders.com" className="text-blue-600 hover:underline">contactus@butterflyproviders.com</a></p>
                <p><strong>Address:</strong> 10720 West Indian School Rd., Phoenix, AZ 85037</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <Link href="/privacy-policy">
            <Button variant="outline" className="gap-2" data-testid="button-privacy">
              <FileText className="w-4 h-4" />
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