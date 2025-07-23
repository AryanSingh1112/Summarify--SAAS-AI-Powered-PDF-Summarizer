"use client"

import { api } from '@/convex/_generated/api'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useMutation, useQuery } from 'convex/react'
import React from 'react'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'

function Upgrade() {
  const { user } = useUser()
  const updateUserUpgrade = useMutation(api.user.updateUserUpgrade)
  
  // Get user info to check if already upgraded
  const GetUserInfo = useQuery(
    api.user.GetUserInfo, 
    user?.primaryEmailAddress?.emailAddress ? {
      email: user.primaryEmailAddress.emailAddress
    } : "skip"
  );
  
  const isUserUpgraded = GetUserInfo?.upgrade || false;

  const onPaymentSuccess = async() => {
    try {
      const result = await updateUserUpgrade({
        email: user?.primaryEmailAddress?.emailAddress,
        upgrade: true
      })
      toast.success('Upgrade successful!')
    } catch (error) {
      toast.error('Upgrade failed. Please try again.')
    }
  }

  const clearPayPalSession = () => {
    // Clear PayPal cookies and session
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    // Force reload to clear PayPal session
    window.location.reload();
    toast.info('PayPal session cleared. You can now login with different account.');
  }
  return (
    <div>

      <h2 className='font-bold text-5xl '> Plans  </h2>
      <p>Update your plan to upload multiple pdfs.</p>
      
      {/* Test Mode Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-start">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Test Mode Active</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>This is PayPal Sandbox mode. Use test PayPal account or test credit cards for payments.</p>
                
              </div>
            </div>
          </div>
          <button
            onClick={clearPayPalSession}
            className="bg-red-100 hover:bg-red-200 text-red-800 text-xs font-medium px-3 py-1 rounded-full transition-colors"
          >
            Clear PayPal Session
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
          <div
            className="rounded-2xl border border-indigo-600 p-6 shadow-xs ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-12"
          >
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Pro
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> 9.99$ </strong>

                <span className="text-sm font-medium text-gray-700">/month</span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 shadow-sm"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"> 20 users included </span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 shadow-sm"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"> 5GB of storage </span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 shadow-sm"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"> Email support </span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 shadow-sm"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"> Help center access </span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 shadow-sm"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"> Phone support </span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 shadow-sm"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"> Community access </span>
              </li>
            </ul>

            {/* <a
              href="#"
              className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:ring-3 focus:outline-hidden"
            >
              Get Started
            </a> */}
            <div className='mt-5'>
              {isUserUpgraded ? (
                <div className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg px-6 py-3 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <svg 
                      className="w-5 h-5 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white font-semibold">Current Plan</span>
                  </div>
                  <p className="text-xs text-indigo-100 mt-1">Thank you for being a Pro member!</p>
                </div>
              ) : (
                <PayPalButtons
                  forceReRender={[user?.primaryEmailAddress?.emailAddress]}
                  style={{
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'rect',
                    label: 'paypal'
                  }}
                  onApprove={() => onPaymentSuccess()}
                  onCancel={() => {}}
                  onError={(err) => {
                    toast.error("Payment failed. Please try again.");
                  }}
                  createOrder={(data, actions) => {
                    return actions?.order?.create({
                      purchase_units: [{
                        amount: {
                          value: '9.99',
                          currency_code: 'USD'
                        },
                        description: 'Pro Plan - AI Summarization'
                      }]
                    });
                  }}
                />
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Starter
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> 0$ </strong>

                <span className="text-sm font-medium text-gray-700">/month</span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 shadow-sm"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"> 10 users included </span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 shadow-sm"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"> 2GB of storage </span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 shadow-sm"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"> Email support </span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700 shadow-sm"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-gray-700"> Help center access </span>
              </li>
            </ul>

            {/* Current Plan Badge for Free Users */}
            <div className='mt-5'>
              {!isUserUpgraded ? (
                <div className="w-full bg-gray-100 border border-gray-300 rounded-lg px-6 py-3 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <svg 
                      className="w-5 h-5 text-green-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-medium">Current Plan</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">You are currently on the free plan</p>
                </div>
              ) : (
                <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-6 py-3 text-center">
                  <span className="text-gray-500 font-medium">Previous Plan</span>
                  <p className="text-xs text-gray-400 mt-1">You have upgraded to Pro</p>
                </div>
              )}
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Upgrade