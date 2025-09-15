import { ArrowLeft, Home, FileSignature, Handshake, Shield, Clock, Users, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import { Link } from 'wouter';

export default function ServiceAgreement() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
            <FileSignature className="w-3 h-3" />
            Service Contract
          </Badge>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Handshake className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-title">
            Service Agreement
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-testid="text-subtitle">
            Our commitment to providing exceptional non-medical home care services
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span data-testid="text-last-updated">Last updated: September 15, 2025</span>
          </div>
        </div>

        {/* Service Agreement Content */}
        <div className="space-y-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Service Agreement Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                This Service Agreement outlines the terms and conditions under which Butterfly Providers 
                will provide non-medical home care services to you and your family. Our goal is to ensure 
                clear expectations and excellent care delivery.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By signing this agreement, both parties commit to working together to provide safe, 
                reliable, and compassionate care in the comfort of your home.
              </p>
            </CardContent>
          </Card>

          {/* Service Scope */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Scope of Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 font-medium">We provide the following non-medical home care services:</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Personal Care Services</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Assistance with bathing and hygiene</li>
                      <li>Help with dressing and grooming</li>
                      <li>Mobility assistance and transfers</li>
                      <li>Toileting assistance</li>
                      <li>Skin care and positioning</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Companion Services</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Social interaction and conversation</li>
                      <li>Activity planning and engagement</li>
                      <li>Accompaniment to appointments</li>
                      <li>Light exercise and walks</li>
                      <li>Reading and entertainment</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Homemaker Services</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Light housekeeping</li>
                      <li>Meal planning and preparation</li>
                      <li>Grocery shopping</li>
                      <li>Laundry and linens</li>
                      <li>Organization and tidying</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Specialized Services</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Dementia and Alzheimer's care</li>
                      <li>Medication reminders</li>
                      <li>Transportation services</li>
                      <li>Respite care for families</li>
                      <li>24-hour live-in care</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                  <p className="text-amber-800 font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Services We Do NOT Provide
                  </p>
                  <ul className="text-amber-700 mt-2 list-disc list-inside text-sm space-y-1">
                    <li>Medical or nursing care</li>
                    <li>Administration of medications</li>
                    <li>Medical procedures or treatments</li>
                    <li>Heavy lifting or moving furniture</li>
                    <li>Home repairs or maintenance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Standards */}
          <Card>
            <CardHeader>
              <CardTitle>Our Service Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 font-medium">We commit to providing:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Thoroughly screened and trained caregivers</li>
                    <li>Consistent, reliable service delivery</li>
                    <li>24/7 on-call support for emergencies</li>
                    <li>Regular supervision and quality monitoring</li>
                    <li>Detailed care plans tailored to your needs</li>
                  </ul>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Prompt communication about schedule changes</li>
                    <li>Respectful, professional caregivers</li>
                    <li>Flexible scheduling to meet your needs</li>
                    <li>Regular care plan reviews and updates</li>
                    <li>Transparent billing and documentation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Caregiver Qualifications */}
          <Card>
            <CardHeader>
              <CardTitle>Caregiver Qualifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">All Butterfly Providers caregivers meet these minimum requirements:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Comprehensive background check</li>
                  <li>Professional references verification</li>
                  <li>CPR and First Aid certification</li>
                  <li>Specialized dementia care training</li>
                  <li>Ongoing professional development</li>
                </ul>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Minimum 1 year of care experience</li>
                  <li>Excellent communication skills</li>
                  <li>Reliable transportation and insurance</li>
                  <li>Commitment to professional standards</li>
                  <li>Regular supervision and evaluation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Service Hours and Scheduling */}
          <Card>
            <CardHeader>
              <CardTitle>Service Hours & Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Available Service Hours</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Regular care: 7 days a week, including holidays</li>
                    <li>Minimum service period: 3 hours per visit</li>
                    <li>Live-in care: 24-hour coverage available</li>
                    <li>Emergency care: On-call support when needed</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Scheduling Policies</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>24-hour notice preferred for schedule changes</li>
                    <li>Emergency changes accommodated when possible</li>
                    <li>Regular caregivers assigned for consistency</li>
                    <li>Backup caregivers available for continuity</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Rates and Billing */}
          <Card>
            <CardHeader>
              <CardTitle>Service Rates & Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Rate Structure</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Competitive hourly rates based on level of care needed</li>
                    <li>No hidden fees or surprise charges</li>
                    <li>Special rates for long-term care arrangements</li>
                    <li>Holiday and weekend rates may apply</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Billing and Payment</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Weekly or bi-weekly billing available</li>
                    <li>Multiple payment methods accepted</li>
                    <li>Insurance billing assistance provided</li>
                    <li>Detailed invoices with service documentation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality Assurance */}
          <Card>
            <CardHeader>
              <CardTitle>Quality Assurance Program</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">We maintain high standards through:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Regular supervisory visits and care plan reviews</li>
                <li>Client satisfaction surveys and feedback collection</li>
                <li>Ongoing caregiver training and development</li>
                <li>24/7 management availability for concerns</li>
                <li>Detailed documentation of all care provided</li>
                <li>Prompt response to client feedback and concerns</li>
              </ul>
            </CardContent>
          </Card>

          {/* Emergency Procedures */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Procedures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  In case of emergency, our caregivers are trained to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Call 911 for immediate medical emergencies</li>
                  <li>Contact client's designated emergency contacts</li>
                  <li>Notify Butterfly Providers management immediately</li>
                  <li>Provide first aid and CPR as trained</li>
                  <li>Document all incidents thoroughly</li>
                  <li>Follow client's specific emergency care plan</li>
                </ul>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                  <p className="text-red-800 font-medium">24/7 Emergency Support</p>
                  <p className="text-red-700 mt-1">
                    Our management team is available 24/7 for emergencies. Emergency contact: 602-830-0966
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-purple-50">
            <CardHeader>
              <CardTitle>Questions About Our Service Agreement?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                For questions about our services or to schedule a consultation:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Phone:</strong> <a href="tel:602-830-0966" className="text-purple-600 hover:underline">602-830-0966</a></p>
                <p><strong>Email:</strong> <a href="mailto:info@butterflyproviders.com" className="text-purple-600 hover:underline">info@butterflyproviders.com</a></p>
                <p><strong>Address:</strong> 10720 West Indian School Rd., Phoenix, AZ 85037</p>
                <p><strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <Link href="/terms-conditions">
            <Button variant="outline" className="gap-2" data-testid="button-terms">
              <FileSignature className="w-4 h-4" />
              Terms & Conditions
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