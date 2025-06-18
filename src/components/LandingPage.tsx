import React from 'react';
import { Hash, Search, Shield, Lock, Eye, Zap, CheckCircle, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onServiceSelect: (service: 'generator' | 'analyzer') => void;
}

export function LandingPage({ onServiceSelect }: LandingPageProps) {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Military-Grade Security",
      description: "Industry-standard algorithms including SHA-256, SHA-512, SHA-1, and MD5"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Client-side processing ensures instant results with no server delays"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Complete Privacy",
      description: "All operations happen locally in your browser - your data never leaves your device"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Production Ready",
      description: "Professional-grade tools suitable for development and security analysis"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Secure Cryptographic
            <br />
            Hashing Made Simple
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Professional-grade cryptographic hashing toolkit for developers, security professionals, 
            and anyone who needs reliable hash generation and analysis. All processing happens 
            securely in your browser.
          </p>
        </div>

        {/* Service Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          {/* Hash Generator Card */}
          <div 
            onClick={() => onServiceSelect('generator')}
            className="group cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mx-auto group-hover:from-blue-600 group-hover:to-blue-700 transition-all">
                <Hash className="h-8 w-8 text-white" />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  Hash Generator
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Convert any text into secure cryptographic hashes using industry-standard 
                  algorithms. Perfect for password hashing, data integrity, and security applications.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>SHA-1, SHA-256, SHA-512, MD5 support</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>One-click copy to clipboard</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time hash generation</span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                <span>Start Hashing</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Hash Analyzer Card */}
          <div 
            onClick={() => onServiceSelect('analyzer')}
            className="group cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl mx-auto group-hover:from-purple-600 group-hover:to-purple-700 transition-all">
                <Search className="h-8 w-8 text-white" />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  Hash Analyzer
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Analyze existing hashes to identify their algorithm type, bit length, and security 
                  characteristics. Get expert insights about hash strength and recommendations.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Automatic algorithm detection</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Security recommendations</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Educational insights</span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2 text-purple-600 dark:text-purple-400 font-medium group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                <span>Analyze Hash</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-slate-700/50">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Why Choose CryptoHash?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
            Built with security, performance, and user experience in mind. 
            Everything you need for professional cryptographic hashing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mx-auto text-white">
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                {feature.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
        <div className="flex items-start space-x-3">
          <Lock className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Important Security Information
            </h4>
            <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
              Cryptographic hashes are one-way functions designed to be irreversible. While this tool 
              can generate and analyze hashes, it cannot "decrypt" or reverse them back to the original 
              text. For password storage, always use dedicated password hashing algorithms like bcrypt, 
              scrypt, or Argon2 with proper salting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}