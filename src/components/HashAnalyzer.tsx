import React, { useState } from 'react';
import { Search, AlertTriangle, Info, Copy, Check, Shield, Key } from 'lucide-react';
import { analyzeHash, verifyBcrypt } from '../utils/cryptoUtils';

export function HashAnalyzer() {
  const [hash, setHash] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [verificationText, setVerificationText] = useState('');
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleAnalyze = () => {
    if (!hash.trim()) {
      return;
    }

    const result = analyzeHash(hash.trim());
    setAnalysis(result);
    setVerificationResult(null); // Reset verification when analyzing new hash
  };

  const handleVerifyPassword = async () => {
    if (!analysis || !verificationText.trim()) {
      return;
    }

    setIsVerifying(true);
    try {
      let result = false;
      
      if (analysis.algorithm === 'bcrypt') {
        result = await verifyBcrypt(verificationText, hash.trim());
      }
      
      setVerificationResult(result);
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationResult(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const isPasswordHash = analysis && analysis.algorithm === 'bcrypt';

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
      {/* Input Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Hash to Analyze
          </label>
          <textarea
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            placeholder="Paste your hash here for analysis..."
            className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all font-mono text-sm"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!hash.trim()}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium rounded-xl transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
        >
          <Search className="h-4 w-4" />
          <span>Analyze Hash</span>
        </button>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
          {/* Hash Type Detection */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-2 mb-2">
              <Info className="h-4 w-4 text-blue-500" />
              <h4 className="font-medium text-slate-800 dark:text-slate-200">
                Hash Analysis
              </h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Length:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">
                  {analysis.length} characters
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Likely Algorithm:</span>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    analysis.confidence === 'high' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : analysis.confidence === 'medium'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  }`}>
                    {analysis.algorithm || 'Unknown'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(analysis.algorithm || 'Unknown')}
                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Confidence:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 capitalize">
                  {analysis.confidence}
                </span>
              </div>
              {analysis.bits && (
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Output Size:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    {analysis.bits} bits
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Password Hash Verification */}
          {isPasswordHash && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-2 mb-3">
                <Key className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium text-blue-800 dark:text-blue-200">
                  Password Verification
                </h4>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                This appears to be a password hash. You can verify if a plaintext password matches this hash:
              </p>
              
              <div className="space-y-3">
                <input
                  type="password"
                  value={verificationText}
                  onChange={(e) => setVerificationText(e.target.value)}
                  placeholder="Enter password to verify..."
                  className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-700 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                
                <button
                  onClick={handleVerifyPassword}
                  disabled={!verificationText.trim() || isVerifying}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium rounded-lg transition-all text-sm"
                >
                  <Shield className="h-4 w-4" />
                  <span>{isVerifying ? 'Verifying...' : 'Verify Password'}</span>
                </button>
                
                {verificationResult !== null && (
                  <div className={`p-3 rounded-lg border ${
                    verificationResult 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  }`}>
                    <div className={`text-sm font-medium ${
                      verificationResult 
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {verificationResult ? '✅ Password matches!' : '❌ Password does not match'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Security Information */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                  {isPasswordHash ? 'Password Hash Security' : 'Hash Irreversibility'}
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                  {isPasswordHash 
                    ? 'This is a password hash with built-in salting. It cannot be reversed to reveal the original password, but can be verified against plaintext passwords.'
                    : 'Cryptographic hashes are designed to be one-way functions. It is computationally infeasible to reverse a hash back to its original input. This property makes hashes ideal for password storage and data integrity verification.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Security Recommendations */}
          {analysis.algorithm && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                    Security Notes
                  </h4>
                  <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    {analysis.algorithm === 'MD5' && (
                      <p>⚠️ MD5 is cryptographically broken and should not be used for security purposes.</p>
                    )}
                    {analysis.algorithm === 'SHA-1' && (
                      <p>⚠️ SHA-1 is deprecated for cryptographic use due to known vulnerabilities.</p>
                    )}
                    {(analysis.algorithm === 'SHA-256' || analysis.algorithm === 'SHA-512') && (
                      <p>✅ This algorithm is currently considered secure for cryptographic use.</p>
                    )}
                    {analysis.algorithm === 'bcrypt' && (
                      <p>✅ bcrypt is a secure password hashing function with adaptive cost and built-in salting.</p>
                    )}
                    {!isPasswordHash && (
                      <p>
                        For password hashing, consider using dedicated algorithms like bcrypt, 
                        scrypt, or Argon2 with proper salting.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}