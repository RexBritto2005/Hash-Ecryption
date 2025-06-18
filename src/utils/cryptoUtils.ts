import CryptoJS from 'crypto-js';
import bcrypt from 'bcryptjs';

/**
 * Hash text using various algorithms
 * Uses Web Crypto API for SHA algorithms, crypto-js for MD5, and bcryptjs for bcrypt
 */
export async function hashText(text: string, algorithm: string, options?: any): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  switch (algorithm) {
    case 'SHA-1':
      return await hashWithWebCrypto(data, 'SHA-1');
    case 'SHA-256':
      return await hashWithWebCrypto(data, 'SHA-256');
    case 'SHA-512':
      return await hashWithWebCrypto(data, 'SHA-512');
    case 'MD5':
      return CryptoJS.MD5(text).toString();
    case 'bcrypt':
      const saltRounds = options?.saltRounds || 12;
      return await bcrypt.hash(text, saltRounds);
    default:
      throw new Error(`Unsupported algorithm: ${algorithm}`);
  }
}

/**
 * Hash data using Web Crypto API
 */
async function hashWithWebCrypto(data: Uint8Array, algorithm: string): Promise<string> {
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Analyze a hash string to determine its likely algorithm
 */
export function analyzeHash(hash: string): {
  length: number;
  algorithm: string | null;
  confidence: 'high' | 'medium' | 'low';
  bits: number | null;
} {
  const cleanHash = hash.replace(/\s+/g, '');
  const length = cleanHash.length;

  // Check for bcrypt pattern
  if (cleanHash.startsWith('$2a$') || cleanHash.startsWith('$2b$') || cleanHash.startsWith('$2y$')) {
    return {
      length,
      algorithm: 'bcrypt',
      confidence: 'high',
      bits: null // bcrypt doesn't have a fixed bit output
    };
  }

  // Check if hash contains only valid hexadecimal characters
  const isValidHex = /^[a-fA-F0-9]+$/.test(cleanHash);
  
  if (!isValidHex) {
    return {
      length,
      algorithm: null,
      confidence: 'low',
      bits: null
    };
  }

  // Determine algorithm based on length for traditional hashes
  switch (length) {
    case 32:
      return {
        length,
        algorithm: 'MD5',
        confidence: 'high',
        bits: 128
      };
    case 40:
      return {
        length,
        algorithm: 'SHA-1',
        confidence: 'high',
        bits: 160
      };
    case 64:
      return {
        length,
        algorithm: 'SHA-256',
        confidence: 'high',
        bits: 256
      };
    case 128:
      return {
        length,
        algorithm: 'SHA-512',
        confidence: 'high',
        bits: 512
      };
    default:
      // Try to make educated guesses for less common lengths
      if (length > 0 && length % 2 === 0) {
        return {
          length,
          algorithm: 'Unknown (possible custom hash)',
          confidence: 'low',
          bits: (length / 2) * 8
        };
      }
      
      return {
        length,
        algorithm: null,
        confidence: 'low',
        bits: null
      };
  }
}

/**
 * Get hash algorithm information
 */
export function getAlgorithmInfo(algorithm: string) {
  const algorithms = {
    'MD5': {
      bits: 128,
      secure: false,
      description: 'Legacy hash function, cryptographically broken'
    },
    'SHA-1': {
      bits: 160,
      secure: false,
      description: 'Deprecated due to collision vulnerabilities'
    },
    'SHA-256': {
      bits: 256,
      secure: true,
      description: 'Part of SHA-2 family, currently secure'
    },
    'SHA-512': {
      bits: 512,
      secure: true,
      description: 'Part of SHA-2 family, currently secure'
    },
    'bcrypt': {
      bits: null,
      secure: true,
      description: 'Adaptive password hashing function with built-in salting'
    }
  };

  return algorithms[algorithm as keyof typeof algorithms] || null;
}

/**
 * Verify bcrypt hash
 */
export async function verifyBcrypt(plaintext: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plaintext, hash);
  } catch (error) {
    console.error('bcrypt verification error:', error);
    return false;
  }
}