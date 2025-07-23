"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [particles, setParticles] = useState([]);

  // Generate particles on client side only to avoid hydration mismatch
  useEffect(() => {
    const generateParticles = () => {
      const particleArray = [];
      for (let i = 0; i < 20; i++) {
        particleArray.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 6,
          duration: 4 + Math.random() * 4
        });
      }
      setParticles(particleArray);
    };

    generateParticles();
  }, []);
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-32 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{animationDelay: '4s'}}></div>
        
        {/* Particle Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(156, 163, 175, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(156, 163, 175, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 glass border-b border-white/20 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="relative">
            
           
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
            SUMMARIFY
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <UserButton />
           
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-5xl mx-auto">
          {/* 3D Title */}
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-2xl">
              Transform
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent drop-shadow-2xl">
              PDFs with AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Upload your documents and get intelligent, comprehensive summaries powered by advanced AI technology. 
            <span className="font-semibold text-purple-600"> Transform the way you read.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/dashboard">
              <Button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 min-w-[200px] animate-glow animate-gradient relative overflow-hidden group">
                <span className="relative z-10">🚀 Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
            <Link href="/dashboard/upgrade">
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-2 border-purple-400 text-purple-700 hover:bg-purple-50 hover:border-purple-500 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 min-w-[200px] glass relative overflow-hidden group">
                <span className="relative z-10">✨ View Plans</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {/* Feature 1 */}
            <div className="glass p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-pulse-slow">
              <div className="text-4xl mb-4 animate-float">🤖</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">AI-Powered</h3>
              <p className="text-gray-700">Advanced machine learning algorithms analyze your documents for accurate, contextual summaries.</p>
            </div>

            {/* Feature 2 */}
            <div className="glass p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-pulse-slow" style={{animationDelay: '1s'}}>
              <div className="text-4xl mb-4 animate-float" style={{animationDelay: '2s'}}>⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Lightning Fast</h3>
              <p className="text-gray-700">Get comprehensive summaries in seconds, not hours. Save time and boost productivity.</p>
            </div>

            {/* Feature 3 */}
            <div className="glass p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-pulse-slow" style={{animationDelay: '2s'}}>
              <div className="text-4xl mb-4 animate-float" style={{animationDelay: '4s'}}>🔒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Secure & Private</h3>
              <p className="text-gray-700">Your documents are protected with enterprise-grade security and privacy controls.</p>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-32 left-10 opacity-60 animate-float">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl transform rotate-12 shadow-lg animate-glow"></div>
          </div>
          <div className="absolute bottom-32 right-10 opacity-60 animate-float" style={{animationDelay: '3s'}}>
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-full transform -rotate-12 shadow-lg animate-glow"></div>
          </div>
          <div className="absolute top-64 right-32 opacity-40 animate-float" style={{animationDelay: '1.5s'}}>
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl transform rotate-45 shadow-lg animate-glow"></div>
          </div>
        </div>
      </main>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-gradient-to-r from-purple-200 to-blue-200">
          <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" className="fill-white/30"></path>
        </svg>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
