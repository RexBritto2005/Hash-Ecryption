import React, { useState } from 'react';
import { Lock, Copy, Check, AlertCircle, Settings } from 'lucide-react';
import { hashText } from '../utils/cryptoUtils';

const HASH_ALGORITHMS = [
  { value: 'SHA-1', label: 'SHA-1 (160-bit)', bits: 160, category: 'Traditional' },
  { value: 'SHA-256', label: 'SHA-256 (256-bit)', bits: 256, category: 'Traditional' },
  { value: 'SHA-512', label: 'SHA-512 (512-bit)', bits: 512, category: 'Traditional' },
  { value: 'MD5', label: 'MD5 (128-bit)', bits: 128, category: 'Traditional' },
  { value: 'bcrypt', label: 'bcrypt (Adaptive)', bits: null, category: 'Password Hashing' },
];

export function HashGenerator() {
  const [plaintext, setPlaintext] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [hash, setHash] = useState('');
  const [isHashing, setIsHashing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Advanced options for bcrypt
  const [bcryptRounds, setBcryptRounds] = useState(12);

  const handleHash = async () => {
    if (!plaintext.trim()) {
      setError('Please enter some text to hash');
      return;
    }

    setIsHashing(true);
    setError('');
    
    try {
      let options = {};
      
      if (algorithm === 'bcrypt') {
        options = { saltRounds: bcryptRounds };
      }
      
      const result = await hashText(plaintext, algorithm, options);
      setHash(result);
    } catch (err) {
      setError('Failed to generate hash. Please try again.');
      console.error('Hashing error:', err);
    } finally {
      setIsHashing(false);
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

  const selectedAlgorithm = HASH_ALGORITHMS.find(alg => alg.value === algorithm);
  const isPasswordHashingAlgorithm = algorithm === 'bcrypt';

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
      {/* Input Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Text to Hash
          </label>
          <textarea
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
          />
        </div>

        {/* Algorithm Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Hash Algorithm
          </label>
          
          {/* Traditional Hashing Algorithms */}
          <div className="mb-4">
            <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
              Traditional Hashing
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {HASH_ALGORITHMS.filter(alg => alg.category === 'Traditional').map((alg) => (
                <label
                  key={alg.value}
                  className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    algorithm === alg.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="algorithm"
                    value={alg.value}
                    checked={algorithm === alg.value}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-slate-800 dark:text-slate-200">
                      {alg.value}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {alg.bits ? `${alg.bits} bits` : 'Variable'}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Password Hashing Algorithms */}
          <div>
            <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
              Password Hashing (Recommended for Passwords)
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {HASH_ALGORITHMS.filter(alg => alg.category === 'Password Hashing').map((alg) => (
                <label
                  key={alg.value}
                  className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    algorithm === alg.value
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="algorithm"
                    value={alg.value}
                    checked={algorithm === alg.value}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-slate-800 dark:text-slate-200">
                      {alg.value}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Adaptive & Secure
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Options for bcrypt */}
        {isPasswordHashingAlgorithm && (
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Advanced Options</span>
            </button>
            
            {showAdvanced && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Salt Rounds (Cost Factor): {bcryptRounds}
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="15"
                    value={bcryptRounds}
                    onChange={(e) => setBcryptRounds(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Higher values = more secure but slower (4-15 recommended)
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
          </div>
        )}

        {/* Hash Button */}
        <button
          onClick={handleHash}
          disabled={isHashing || !plaintext.trim()}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium rounded-xl transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
        >
          <Lock className="h-4 w-4" />
          <span>{isHashing ? 'Generating Hash...' : 'Generate Hash'}</span>
        </button>
      </div>

      {/* Output Section */}
      {hash && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {algorithm} Hash {selectedAlgorithm?.bits ? `(${selectedAlgorithm.bits} bits)` : ''}
            </label>
            <button
              onClick={() => copyToClipboard(hash)}
              className="flex items-center space-x-1 px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <code className="text-sm text-slate-800 dark:text-slate-200 break-all font-mono">
              {hash}
            </code>
          </div>
          
          {/* Algorithm-specific information */}
          {isPasswordHashingAlgorithm && (
            <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-sm text-green-700 dark:text-green-300">
                <strong>✅ Password Hash Generated:</strong> This hash includes built-in salting and is suitable for secure password storage.
                Cost factor: {bcryptRounds}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}