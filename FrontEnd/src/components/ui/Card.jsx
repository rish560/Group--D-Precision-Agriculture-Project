import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -2, boxShadow: '0 8px 24px -8px rgba(0,0,0,0.12)' } : undefined}
      transition={{ duration: 0.18 }}
      className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
