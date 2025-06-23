import React from 'react';
import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';

const fontFamily = `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif`;

interface SectionFormProps {
  title?: string;
}

const SectionForm: React.FC<SectionFormProps> = ({ title = 'оставить заявку' }) => (
  <SectionContainer>
    {title && <SectionTitle>{title}</SectionTitle>}
    <form className="flex flex-col sm:flex-row gap-4 w-full max-w-xl items-center justify-center mt-8">
      <input
        type="email"
        required
        placeholder="Ваш email"
        className="w-full flex-1 px-6 py-4 rounded-xl border border-gray-300 bg-white text-gray-900 text-lg outline-none focus:border-gray-500 transition-all duration-200"
        style={{ fontFamily }}
      />
      <button
        type="submit"
        className="px-8 py-4 rounded-xl bg-gray-900 text-white text-lg font-medium hover:bg-gray-800 transition-all duration-200"
        style={{ fontFamily }}
      >
        отправить
      </button>
    </form>
  </SectionContainer>
);

export default SectionForm; 