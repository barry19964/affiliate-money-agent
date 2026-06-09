import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Share2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">Thank You!</h1>
          <p className="text-xl text-gray-300 mb-2">Your guide is on its way to your inbox.</p>
          <p className="text-gray-400">Check your email (including spam folder) for your download link.</p>
        </div>

        {/* What's Next */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">What's Next?</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Check Your Email</h3>
                <p className="text-gray-400">
                  Look for an email from us with your guide. If you don't see it, check your spam
                  folder.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Download & Read</h3>
                <p className="text-gray-400">
                  Download the guide and start reading. Implement the first tip today.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Get Exclusive Tips</h3>
                <p className="text-gray-400">
                  Over the next 7 days, you'll receive exclusive tips and special offers via email.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bonus Content */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">🎁 Bonus: Exclusive Email Sequence</h3>
          <p className="text-gray-300 mb-4">
            Over the next 7 days, you'll receive exclusive tips, case studies, and special offers
            that aren't available anywhere else.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>✓ Day 1: The #1 tool I use every day</li>
            <li>✓ Day 3: How to make money with these tools</li>
            <li>✓ Day 5: Exclusive 40% discount (24 hours only)</li>
            <li>✓ Day 7: Real case studies from users</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white py-6 flex items-center justify-center gap-2">
            <Mail className="w-5 h-5" />
            Check Email
          </Button>

          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 py-6 flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            Share with Friends
          </Button>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">Want to explore more?</p>
          <Link href="/">
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              Back to Home
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* FAQ */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-bold text-white mb-4">Common Questions</h3>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-white mb-1">Where's my email?</p>
              <p className="text-gray-400">
                Check your spam/promotions folder. If you still don't see it after 5 minutes, let
                us know.
              </p>
            </div>

            <div>
              <p className="font-semibold text-white mb-1">Can I unsubscribe?</p>
              <p className="text-gray-400">
                Of course! Every email has an unsubscribe link. We respect your inbox.
              </p>
            </div>

            <div>
              <p className="font-semibold text-white mb-1">Is this really free?</p>
              <p className="text-gray-400">
                Yes! The guide is completely free. We just want to help you save time and make
                more money.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
