import { ArrowLeft, Home, Heart, Users, Shield, Clock, Star, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import { Link } from 'wouter';

export default function CodeOfEthics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50">
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
            <Heart className="w-3 h-3" />
            Professional Standards
          </Badge>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-rose-100 p-3 rounded-full">
              <Heart className="w-8 h-8 text-rose-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-title">
            Code of Ethics
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-testid="text-subtitle">
            Our commitment to the highest standards of professional care and ethical conduct
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span data-testid="text-last-updated">Last updated: September 15, 2025</span>
          </div>
        </div>

        {/* Code of Ethics Content */}
        <div className="space-y-6">
          {/* Mission Statement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-rose-600" />
                Our Mission & Values
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                At Butterfly Providers, we are committed to providing compassionate, professional, 
                and ethical home care services that enhance the quality of life for our clients 
                while supporting their independence and dignity.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This Code of Ethics serves as our guiding principles, ensuring that every team member 
                upholds the highest standards of professional conduct in all interactions with clients, 
                families, and colleagues.
              </p>
            </CardContent>
          </Card>

          {/* Core Values */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-600" />
                Our Core Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Compassion
                    </h4>
                    <p className="text-gray-700 text-sm">
                      We approach every client with empathy, understanding, and genuine care, 
                      recognizing their unique needs and circumstances.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Dignity
                    </h4>
                    <p className="text-gray-700 text-sm">
                      We respect each client's inherent worth, treating them with honor and 
                      preserving their self-respect in all aspects of care.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Integrity
                    </h4>
                    <p className="text-gray-700 text-sm">
                      We conduct ourselves honestly and transparently, maintaining ethical 
                      standards in all our professional relationships.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Excellence
                    </h4>
                    <p className="text-gray-700 text-sm">
                      We strive for the highest quality of care, continuously improving our 
                      services and professional skills.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Respect
                    </h4>
                    <p className="text-gray-700 text-sm">
                      We honor each client's autonomy, choices, cultural background, and 
                      personal beliefs without judgment.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Reliability
                    </h4>
                    <p className="text-gray-700 text-sm">
                      We are dependable and consistent, providing stable care that clients 
                      and families can trust.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client Rights and Dignity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Client Rights & Dignity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">We are committed to upholding every client's rights:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Right to respectful, considerate treatment</li>
                  <li>Right to participate in care planning decisions</li>
                  <li>Right to privacy and confidentiality</li>
                  <li>Right to voice complaints without fear of retaliation</li>
                  <li>Right to refuse any aspect of care</li>
                </ul>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Right to cultural and spiritual accommodation</li>
                  <li>Right to be free from discrimination and abuse</li>
                  <li>Right to receive accurate information about services</li>
                  <li>Right to have personal property respected</li>
                  <li>Right to choose their own healthcare providers</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Professional Conduct Standards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                Professional Conduct Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Professional Boundaries</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm ml-4">
                    <li>Maintain appropriate professional relationships with clients and families</li>
                    <li>Avoid dual relationships that could compromise professional judgment</li>
                    <li>Do not accept gifts, loans, or favors from clients</li>
                    <li>Keep personal problems separate from professional duties</li>
                    <li>Report any boundary violations to management immediately</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Competency and Training</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm ml-4">
                    <li>Maintain current certifications and training requirements</li>
                    <li>Practice only within the scope of our training and competence</li>
                    <li>Seek supervision and guidance when facing unfamiliar situations</li>
                    <li>Participate in ongoing professional development</li>
                    <li>Stay current with best practices in home care</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Communication Standards</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm ml-4">
                    <li>Communicate clearly, honestly, and respectfully</li>
                    <li>Use language that is appropriate and understandable</li>
                    <li>Listen actively to client concerns and preferences</li>
                    <li>Document accurately and completely</li>
                    <li>Report significant changes or concerns promptly</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confidentiality and Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Confidentiality & Privacy Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">We maintain strict confidentiality standards:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Protect all client information from unauthorized disclosure</li>
                <li>Share information only as necessary for care coordination</li>
                <li>Obtain proper authorization before sharing information with third parties</li>
                <li>Secure all written and electronic records containing client information</li>
                <li>Respect client privacy during personal care activities</li>
                <li>Discuss client matters only with authorized personnel</li>
                <li>Maintain confidentiality even after employment ends</li>
              </ul>
            </CardContent>
          </Card>

          {/* Safety and Risk Management */}
          <Card>
            <CardHeader>
              <CardTitle>Safety & Risk Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Safety is our top priority for clients, families, and caregivers:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Follow all safety protocols and infection control procedures</li>
                  <li>Identify and report potential safety hazards immediately</li>
                  <li>Use proper body mechanics and assistive devices</li>
                  <li>Maintain a clean and safe environment</li>
                  <li>Report incidents, accidents, or injuries promptly</li>
                  <li>Follow emergency procedures and protocols</li>
                  <li>Never provide care under the influence of substances</li>
                  <li>Practice standard precautions for infection prevention</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quality Improvement */}
          <Card>
            <CardHeader>
              <CardTitle>Commitment to Quality Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We are dedicated to continuous improvement in all aspects of our services:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Participate actively in quality assurance programs</li>
                <li>Welcome feedback from clients, families, and supervisors</li>
                <li>Implement evidence-based best practices</li>
                <li>Engage in regular performance evaluations</li>
                <li>Contribute to team meetings and case discussions</li>
                <li>Support research and improvement initiatives</li>
                <li>Maintain high standards of personal and professional appearance</li>
              </ul>
            </CardContent>
          </Card>

          {/* Ethical Decision Making */}
          <Card>
            <CardHeader>
              <CardTitle>Ethical Decision Making Process</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                When facing ethical dilemmas, we follow a structured decision-making process:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-gray-900">1. Identify the Issue</h5>
                    <p className="text-sm text-gray-700">Clearly define the ethical concern or dilemma</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">2. Gather Information</h5>
                    <p className="text-sm text-gray-700">Collect all relevant facts and perspectives</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">3. Consider Options</h5>
                    <p className="text-sm text-gray-700">Explore all possible courses of action</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-gray-900">4. Consult Resources</h5>
                    <p className="text-sm text-gray-700">Seek guidance from supervisors and policies</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">5. Make Decision</h5>
                    <p className="text-sm text-gray-700">Choose the most ethical course of action</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">6. Evaluate Outcome</h5>
                    <p className="text-sm text-gray-700">Review results and learn from the experience</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance and Accountability */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance & Accountability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  All team members are expected to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Read, understand, and comply with this Code of Ethics</li>
                  <li>Report any violations or concerns to management</li>
                  <li>Participate in ethics training and education programs</li>
                  <li>Support colleagues in maintaining ethical standards</li>
                  <li>Take personal responsibility for professional conduct</li>
                </ul>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
                  <p className="text-orange-800 font-medium">Reporting Concerns</p>
                  <p className="text-orange-700 mt-1">
                    We encourage open communication about ethical concerns. All reports will be 
                    investigated thoroughly and confidentially, with no retaliation against 
                    individuals reporting in good faith.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-rose-50">
            <CardHeader>
              <CardTitle>Ethics Questions or Concerns?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                For questions about ethics or to report concerns:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Ethics Officer:</strong> Butterfly Providers Management Team</p>
                <p><strong>Phone:</strong> <a href="tel:602-830-0966" className="text-rose-600 hover:underline">602-830-0966</a></p>
                <p><strong>Email:</strong> <a href="mailto:ethics@butterflyproviders.com" className="text-rose-600 hover:underline">ethics@butterflyproviders.com</a></p>
                <p><strong>Address:</strong> 10720 West Indian School Rd., Phoenix, AZ 85037</p>
                <p><strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <Link href="/service-agreement">
            <Button variant="outline" className="gap-2" data-testid="button-service">
              <Shield className="w-4 h-4" />
              Service Agreement
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