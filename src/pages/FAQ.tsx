import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

function FAQ() {
  const [openSection, setOpenSection] = useState<string | null>('general');
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = {
    general: [
      {
        question: "What is EduReach?",
        answer: "EduReach is a digital learning platform designed to provide quality education to students in rural India through virtual classrooms, interactive content, and expert teachers."
      },
      {
        question: "How do I get started?",
        answer: "Simply create an account, choose your courses, and start learning! Our platform is designed to be user-friendly and accessible on various devices."
      },
      {
        question: "Is EduReach free to use?",
        answer: "We offer both free and premium content. Basic features and selected courses are free, while premium content requires a subscription."
      }
    ],
    technical: [
      {
        question: "What devices can I use to access EduReach?",
        answer: "EduReach is accessible on computers, tablets, and smartphones. We recommend using a device with a stable internet connection for the best experience."
      },
      {
        question: "Can I download content for offline viewing?",
        answer: "Yes, premium users can download course materials and videos for offline access when internet connectivity is limited."
      },
      {
        question: "How do I report technical issues?",
        answer: "You can report technical issues through our support portal or contact our technical support team at support@edureach.com."
      }
    ],
    courses: [
      {
        question: "What subjects are covered?",
        answer: "We cover all major subjects including Mathematics, Science, English, and Social Studies, aligned with the national curriculum."
      },
      {
        question: "How long do I have access to a course?",
        answer: "Once enrolled, you have lifetime access to free courses. Premium courses are accessible throughout your subscription period."
      },
      {
        question: "Can I switch between different courses?",
        answer: "Yes, you can enroll in multiple courses and switch between them at any time."
      }
    ],
    payment: [
      {
        question: "What payment methods are accepted?",
        answer: "We accept major credit/debit cards, UPI, and net banking for premium subscriptions."
      },
      {
        question: "Is there a refund policy?",
        answer: "Yes, we offer a 7-day refund policy if you're not satisfied with your premium subscription."
      },
      {
        question: "Are there any hidden charges?",
        answer: "No, all charges are clearly displayed before purchase. There are no hidden fees."
      }
    ]
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <main className="flex-grow pt-20 pb-8 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-6">
          {Object.entries(faqs).map(([section, questions]) => (
            <div key={section} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50"
                onClick={() => toggleSection(section)}
              >
                <h2 className="text-xl font-semibold text-gray-900 capitalize">
                  {section} Questions
                </h2>
                {openSection === section ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {openSection === section && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    {questions
                      .filter(q => 
                        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((faq, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </main>
  );
}

export default FAQ;