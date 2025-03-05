"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useCountries } from "@/actions/useCountries"
import { useGenres } from "@/actions/useMusic"
import { toast, Toaster } from 'react-hot-toast'
import axios from "axios"
import { useRouter } from "next/navigation"
import { ScaleLoader } from "react-spinners";
const Register = () => {
  enum STEPS {
    NAME = 1,
    EMAIL = 2,
    IMAGE = 3,
    GENDER = 4,
    COUNTRY = 5,
    PREFERENCES = 6
  }

  interface UserDetails {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image: File | null;
    gender: string;
    country: string;
    age: number;
    preferences: string;
  }

  const [step, setStep] = useState(STEPS.NAME)
  const countries = useCountries()
  const genres = useGenres()
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    image: null,
    gender: '',
    country: '',
    age: 0,
    preferences: ''
  })
  const apiUrl = process.env.NEXT_PUBLIC_DB_URL + "/api/auth/register"
  const onNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "image" && files) {
      setUserDetails({
        ...userDetails,
        image: files[0]
      });
    } else if (name === "preferences") {
      const selectedOptions = Array.from((e.target as HTMLSelectElement).selectedOptions).map(
        (option) => option.value
      ); // we are making an array and then destructing and saving them pop,k-pop example
      setUserDetails({
        ...userDetails,
        preferences: selectedOptions.join(","), // Convert array to comma-separated string
      });
    } else {
      setUserDetails({
        ...userDetails,
        [name]: value
      });
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

  useEffect(() => {
    switch (step) {
      case STEPS.NAME:
        setDisabled(userDetails.firstName.trim() === "");
        break;
      case STEPS.EMAIL:
        setDisabled(userDetails.email.trim() === "" || userDetails.password.trim() === "");
        break;
      case STEPS.IMAGE:
        setDisabled(false)
        break;
      case STEPS.GENDER:
        setDisabled(userDetails.gender.trim() === "" || userDetails.age.valueOf() === 0);
        break;
      case STEPS.COUNTRY:
        setDisabled(userDetails.country.trim() === "");
        break;
      case STEPS.PREFERENCES:
        setDisabled(userDetails.preferences.trim() === "");
        break;
      default:
        setDisabled(false);
    }
  }, [userDetails, step])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('firstName', userDetails.firstName)
    if (userDetails.lastName) {
      formdata.append('lastName', userDetails.lastName)
    }
    formdata.append('email', userDetails.email)
    formdata.append('password', userDetails.password)
    if (userDetails.image) {
      formdata.append('image', userDetails.image)
    }
    formdata.append('gender', userDetails.gender)
    formdata.append('age', String(userDetails.age))
    formdata.append('country', userDetails.country)
    formdata.append('preferences', userDetails.preferences)
    try {
      setLoading(true)
      const response = await axios.post(apiUrl, formdata)
      if (response.status === 201) {
        toast.success('Register Successful')
        router.push('/api/auth/login')
        setUserDetails({
          firstName: '',
          lastName: '',
          image: null,
          email: '',
          password: '',
          gender: '',
          country: '',
          preferences: '',
          age: 0
        })
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
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
                <Image src="/memo.png" alt="logo" width={44} height={24} className="w-auto h-auto" />
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
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center md:w-1/2 h-full p-4 sm:p-8 md:border-l border-gray-100"
            onSubmit={handleSubmit}>
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
                      Let&apos;s start with your name.
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
                        name="firstName"
                        placeholder="First Name"
                        className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                        onChange={handleChange}
                        value={userDetails.firstName}
                      />
                      <label htmlFor="lastname" className="text-lg sm:text-xl">Lastname (optional)</label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        onChange={handleChange}
                        value={userDetails.lastName}
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
                        name="email"
                        placeholder="johndoe@gmail.com"
                        className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                        onChange={handleChange}
                        value={userDetails.email}
                      />
                      <label htmlFor="password" className="text-lg sm:text-xl">Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                        onChange={handleChange}
                        value={userDetails.password}
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
                      <label htmlFor="image" className="text-lg sm:text-xl">Profile Picture (optional)</label>
                      <input
                        type="file"
                        name="image"
                        className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        onChange={handleChange}
                      // value={userDetails.image}
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
                      <select
                        name="gender"
                        className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                        onChange={handleChange}
                        value={userDetails.gender}
                      >
                        <option value="">Choose your Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <label htmlFor="age" className="text-lg sm:text-xl">Age</label>
                      <input
                        type="number"
                        name="age"
                        min={5}
                        placeholder="Enter your age (minimum 5)"
                        className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required value={userDetails.age} onChange={handleChange}
                      />
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
                      <select
                        name="country"
                        className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                        onChange={handleChange}
                        value={userDetails.country}
                      >
                        <option value="" disabled>Choose your country</option>
                        {countries.map((country) => (
                          <option key={country.name} value={country.name}>
                            {country.flag} {country.name}
                          </option>
                        ))}
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
                      <label htmlFor="preferences" className="text-lg sm:text-xl">Preferences</label>
                      <select
                        name="preferences"
                        multiple
                        className="p-3 sm:p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                        onChange={handleChange}
                        value={userDetails.preferences ? userDetails.preferences.split(",") : []}
                      >
                        <option value="" disabled>Choose your preferences</option>
                        {genres.map((genre, index) => (
                          <option key={index} value={genre.name}>
                            {genre.name}
                          </option>
                        ))}
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
                    onClick={(e) => handleSubmit(e)}
                  >
                    {
                      loading ? <ScaleLoader color="#FFFFFF" /> : 'Complete Registration'
                    }
                  </motion.button>
                ) : (
                  <motion.button
                    variants={buttonHover}
                    initial="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 bg-indigo-600 text-white py-3 sm:py-4 rounded-lg hover:bg-indigo-700 transition font-medium cursor-pointer"
                    onClick={(e) => onNext(e)}
                    disabled={disabled}
                  >
                    Next
                  </motion.button>
                )}
              </div>
            </div>
          </motion.form>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default Register