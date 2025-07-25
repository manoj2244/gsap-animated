import { X } from 'lucide-react';

interface ContactFormProps {
  onClose: () => void;
}

const ContactForm = ({ onClose }: ContactFormProps) => {
  return (
    <div className="h-full w-full bg-black text-white px-6 sm:px-12 py-8 sm:py-12 flex flex-col">
      {/* Close Button */}
        <div className="flex justify-end">
          <button
         
          className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 text-[18px] transition"
        >
          Close 
        </button>
        <button
          onClick={onClose}
          className="flex items-center gap-2 bg-white text-black px-4 py-4 hover:bg-gray-200 transition"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      {/* Let’s Talk Title */}
      <h2 className="text-3xl sm:text-4xl font-semibold mt-6 mb-10 text-pink-500">Let’s talk —</h2>

      {/* Form */}
      <form className="flex flex-col gap-8 flex-grow justify-center max-w-xl w-full mx-auto">
        {/* INPUT with floating label */}
        {[
          { name: 'firstName', label: 'First Name *', type: 'text' },
          { name: 'lastName', label: 'Last Name *', type: 'text' },
          { name: 'email', label: 'Email Address *', type: 'email' },
          { name: 'company', label: 'Company Name *', type: 'text' },
        ].map((field) => (
          <div key={field.name} className="relative">
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required
              placeholder=" "
              className="peer w-full bg-black border border-pink-500 px-6 py-5 text-lg text-white placeholder-transparent focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
            />
            <label
              htmlFor={field.name}
              className="absolute left-6 top-5 text-white text-lg transition-all duration-200 ease-in-out peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-400"
            >
              {field.label}
            </label>
          </div>
        ))}

        {/* TEXTAREA */}
        <div className="relative">
          <textarea
            id="message"
            name="message"
            required
            placeholder=" "
            className="peer w-full bg-black border border-pink-500 px-6 py-5 text-lg text-white placeholder-transparent h-32 resize-none focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
          />
          <label
            htmlFor="message"
            className="absolute left-6 top-5 text-white text-lg transition-all duration-200 ease-in-out peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-400"
          >
            Tell us a little bit more: *
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-5 text-lg font-medium hover:bg-pink-700 transition"
        >
          Submit
        </button>

        <p className="text-sm mt-4 text-white/70">
          Learn more about how your information will be used in our{' '}
          <a href="#" className="underline text-pink-400">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
