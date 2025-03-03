"use client"
import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"

const Register = () => {
  enum STEPS {
    NAME = 1,
    EMAIL = 2,
    IMAGE = 3,
    GENDER = 4,
    COUNTRY = 5,
    PREFERENCES = 6
  }
  const [step, setStep] = useState(STEPS.NAME)

  const onNext = () => {
    if (step === 6) {
      return;
    }
    setStep((prev) => prev + 1)
  }

  const onBack = () => {
    if (step === 1) {
      return;
    }
    setStep((prev) => prev - 1)
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const buttonHover = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 400
      }
    }
  }

  return (
    <div className="min-h-screen bg-indigo-950 flex items-center justify-center p-4">
      <div className="register-container bg-white rounded-lg shadow-xl w-full max-w-screen-xl mx-auto flex flex-col md:flex-row h-auto md:h-[800px]">
        {/* Left Section - Tuneshare Logo and Title */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-col items-center justify-center md:w-1/2 py-10 md:py-0 h-full p-4 sm:p-8 text-center"
        >
          <div className="flex flex-col items-center max-w-xs">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="h-16 w-16 sm:h-20 sm:w-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 sm:mb-6"
            >
              <Image src="/memo.png" alt="logo" width={44} height={24} />
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
              animate={{
                color: ["#1d4ed8", "#4f46e5", "#3b82f6", "#1d4ed8"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Welcome to Tuneshare
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-16"
            >
              From finding new talent to working on your next hit—TuneShare connects artists and visionaries effortlessly.
            </motion.p>

            {/* Progress indicator */}
            <div className="w-full mt-4 sm:mt-8">
              <div className="flex items-center mb-2">
                <span className="text-sm sm:text-md font-medium bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  STEP {step} OF {STEPS.PREFERENCES}
                </span>
              </div>
              <motion.div
                className="h-2 w-full bg-blue-100 rounded-full"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="h-2 bg-blue-500 rounded-full"
                  initial={{ width: `${((step - 1) / 6) * 100}%` }}
                  animate={{ width: `${(step / 6) * 100}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Input Fields */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col justify-center md:w-1/2 h-full p-4 sm:p-8 md:border-l border-gray-100"
        >
          <div className="max-w-md mx-auto md:mx-0">
            {
              step === STEPS.NAME && (
                <>
                  <motion.h2
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8"
                  >
                    Let's start with your name.
                  </motion.h2>

                  <motion.div
                    key={`form-${step}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <label htmlFor="firstname" className="text-lg sm:text-xl">Firstname</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                    <label htmlFor="lastname" className="text-lg sm:text-xl">Lastname (optional)</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </motion.div>
                </>
              )
            }

            {
              step === STEPS.EMAIL && (
                <>
                  <motion.h2
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8"
                  >
                    Please Enter Your Credentials.
                  </motion.h2>

                  <motion.div
                    key={`form-${step}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <label htmlFor="email" className="text-lg sm:text-xl">Email</label>
                    <input
                      type="email"
                      placeholder="johndoe@gmail.com"
                      className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                    <label htmlFor="password" className="text-lg sm:text-xl">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </motion.div>
                </>
              )
            }

            {
              step === STEPS.IMAGE && (
                <>
                  <motion.h2
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8"
                  >
                    Please add your Image.
                  </motion.h2>

                  <motion.div
                    key={`form-${step}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <label htmlFor="email" className="text-lg sm:text-xl">Profile Picture(optional)</label>
                    <input
                      type="file"
                      placeholder="Choose your profile picture"
                      className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </motion.div>
                </>
              )
            }

            {
              step === STEPS.GENDER && (
                <>
                  <motion.h2
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8"
                  >
                    Select your Gender and Age.
                  </motion.h2>

                  <motion.div
                    key={`form-${step}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <label htmlFor="gender" className="text-lg sm:text-xl">Gender</label>
                    <select className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent " required>
                    <option value="">Choose your Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <label htmlFor="age" className="text-lg sm:text-xl">Age</label>
                    <input className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent " required type="number" min={5} placeholder="Enter your age (minimum 5)" />
                  </motion.div>
                </>
              )
            }
            {
              step === STEPS.COUNTRY && (
                <>
                  <motion.h2
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8"
                  >
                    Select your Country.
                  </motion.h2>

                  <motion.div
                    key={`form-${step}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <label htmlFor="country" className="text-lg sm:text-xl">Country</label>
                    <select className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent " required>
                    <option value="">Choose your country</option>
                      <option value="india">India</option>
                      <option value="usa">USA</option>
                      <option value="france">France</option>
                    </select>
                  </motion.div>
                </>
              )
            }

{
              step === STEPS.PREFERENCES && (
                <>
                  <motion.h2
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8"
                  >
                    Select your Preferences.
                  </motion.h2>

                  <motion.div
                    key={`form-${step}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <label htmlFor="country" className="text-lg sm:text-xl">Preferences</label>
                    <select className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent " required>
                    <option value="">Choose your preferences</option>
                      <option value="india">India</option>
                      <option value="usa">USA</option>
                      <option value="france">France</option>
                    </select>
                  </motion.div>
                </>
              )
            }
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {step !== 1 && (
                <motion.button
                  variants={buttonHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 bg-indigo-100 text-indigo-600 py-3 sm:py-4 rounded-lg transition font-medium cursor-pointer"
                  onClick={onBack}
                >
                  Back
                </motion.button>
              )}

              {step === 6 ? (
                <motion.button
                  variants={buttonHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 bg-indigo-600 text-white py-3 sm:py-4 rounded-lg hover:bg-indigo-700 transition font-medium cursor-pointer"
                >
                  Complete Registration
                </motion.button>
              ) : (
                <motion.button
                  variants={buttonHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 bg-indigo-600 text-white py-3 sm:py-4 rounded-lg hover:bg-indigo-700 transition font-medium cursor-pointer"
                  onClick={onNext}
                >
                  Next
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Register