import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Linkedin, Youtube, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';

export function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    setStatus('sending');

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id',
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key'
      );

      console.log(result.text);
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });

      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'PHONE',
      content: '0112996984 / 0778040377',
      link: 'tel:0112996984',
    },
    {
      icon: Mail,
      title: 'EMAIL',
      content: 'superads1info@gmail.com',
      link: 'mailto:superads1info@gmail.com',
    },
    {
      icon: MapPin,
      title: 'LOCATION',
      content: 'No.253/A siyambalape south Siyambalape.(Mawaramandiya)',
      link: '#',
    },
  ];

  return (
    <section id="contact" className="py-12 md:py-20 lg:py-32 border-t-4 border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-secondary">
            Let's Create Something{' '}
            <span className="text-primary">Amazing Together</span>
          </h2>

          <p className="text-base text-secondary/80">
            Ready to elevate your brand? Contact us today and let's discuss how we can help you achieve your marketing goals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto items-start">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <div className="bg-white rounded-3xl p-6 lg:p-8 h-full border-4 border-primary shadow-xl flex flex-col">
              <h3 className="text-xl font-bold mb-2 text-secondary uppercase tracking-wide">Contact Information</h3>
              <p className="text-secondary/70 mb-6 text-xs uppercase">
                Have a question or want to discuss your next campaign? We're here to help!
              </p>

              <div className="space-y-4 mb-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 group border-l-4 border-primary pl-3"
                  >
                    <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold mb-0.5 text-secondary text-xs uppercase tracking-wide">{info.title}</div>
                      <div className="text-secondary/80 text-xs">{info.content}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Google Map */}
              <div className="mt-auto rounded-2xl overflow-hidden border-4 border-primary/30">
                <div className="bg-primary text-white p-2.5 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-bold text-xs uppercase">Find Us Here</span>
                </div>
                <div className="relative w-full h-56">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d990.0776586373114!2d79.9885089!3d6.9726308!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae257f16b323f7b%3A0xdd16559c29f187cb!2sSUPER%20ADS%20(PVT)%20LTD!5e0!3m2!1sen!2slk!4v1770530291939!5m2!1sen!2slk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="space-y-5 bg-white p-6 lg:p-8 rounded-3xl border-4 border-primary shadow-xl h-full flex flex-col"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block mb-1.5 text-secondary font-bold text-xs uppercase tracking-wide">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="YOUR NAME"
                    className="w-full border-2 border-secondary/30 rounded-xl focus:border-secondary h-11 px-3 placeholder:text-secondary/40 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1.5 text-secondary font-bold text-xs uppercase tracking-wide">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="YOUR EMAIL"
                    className="w-full border-2 border-secondary/30 rounded-xl focus:border-secondary h-11 px-3 placeholder:text-secondary/40 text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block mb-1.5 text-secondary font-bold text-xs uppercase tracking-wide">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="YOUR PHONE NUMBER"
                    className="w-full border-2 border-secondary/30 rounded-xl focus:border-secondary h-11 px-3 placeholder:text-secondary/40 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block mb-1.5 text-secondary font-bold text-xs uppercase tracking-wide">
                    Company Name
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="YOUR COMPANY"
                    className="w-full border-2 border-secondary/30 rounded-xl focus:border-secondary h-11 px-3 placeholder:text-secondary/40 text-sm"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label htmlFor="message" className="block mb-1.5 text-secondary font-bold text-xs uppercase tracking-wide">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="TELL US ABOUT YOUR PROJECT..."
                  rows={8}
                  className="w-full resize-none border-2 border-secondary/30 rounded-xl focus:border-secondary px-3 py-2.5 placeholder:text-secondary/40 text-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-5 rounded-xl font-bold text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${status === 'success'
                  ? 'bg-green-500 hover:bg-green-600'
                  : status === 'error'
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-primary hover:bg-primary/90'
                  } text-white`}
              >
                {status === 'idle' && (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
                {status === 'sending' && (
                  <>
                    Sending...
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                )}
                {status === 'success' && (
                  <>
                    Message Sent!
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
                {status === 'error' && (
                  <>
                    Failed to Send
                    <AlertCircle className="w-4 h-4" />
                  </>
                )}
              </Button>

              {/* Social Links */}
              <div className="pt-4 border-t-2 border-secondary/10">
                <h4 className="font-bold mb-3 text-secondary text-xs uppercase tracking-wide">Follow Us</h4>
                <div className="flex gap-3">
                  <motion.a
                    href="https://www.facebook.com/SuperadsBTL"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 bg-secondary rounded-xl flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-white" />
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/superads_privat_limited.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 bg-secondary rounded-xl flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/super-ads-private-limited-a75105372/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 bg-secondary rounded-xl flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </motion.a>
                  <motion.a
                    href="https://youtube.com/@superadsprivartelimited?si=qANX3rXoWQjwWco6"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 bg-secondary rounded-xl flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Youtube className="w-5 h-5 text-white" />
                  </motion.a>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}