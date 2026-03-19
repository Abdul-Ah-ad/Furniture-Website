import { createContext, useContext, useState } from 'react'

export const strings = {
  en: {
    nav: {
      home:    'Home',
      gallery: 'Gallery',
      about:   'About',
      contact: 'Contact',
      cta:     'Get a Quote',
    },
    hero: {
      label:  'Since 1980s, Made in Pakistan',
      title1: '40+ Years of',
      title2: 'Love & Craft',
      sub:    'Shafiq and Sons, A trusted furniture company in Pakistan crafting premium handcrafted wood furniture since the 1980s. Built for your home, tailored to your taste.',
      btn1:   'Browse Collection',
      btn2:   'Custom Order',
      stat1:  'Years of Experience',
      stat2:  'Happy Customers',
      stat3:  'Pure Solid Wood',
    },
    gallery: {
      label:        'Our Collection',
      title:        'Something Special for Every Home',
      sub:          'Living room, bedroom, dining or office, Shafiq and Sons brings 40+ years of expertise to create furniture tailored to your taste.',
      bannerTitle:  "Can't find what you're looking for?",
      bannerDesc:   'Every piece can be customised to your exact dimensions, colour and finish.',
      bannerBtn:    'Place a Custom Order',
      categories: {
        all:     'All Pieces',
        living:  'Living Room',
        bedroom: 'Bedroom',
        dining:  'Dining',
        office:  'Office',
        outdoor: 'Outdoor',
      },
    },
    about: {
      label:  'Our Story',
      title1: 'Lahore Craftsmanship,',
      title2: "Pakistan's Pride",
      lead:   'Shafiq and Sons was founded in Lahore in the 1980s, from a small shop that has grown into one of Pakistan\'s most respected furniture brands.',
      body:   'We believe furniture is not just something you buy, it is the soul of a home. Every dovetail joint, every polished edge carries 40 years of expertise. To this day, every piece is built by hand, no shortcuts, no MDF.',
      values: [
        { title: 'Made in Pakistan',      desc: 'Everything is crafted in Pakistan. Local artisans, local wood, but quality that meets international standards.' },
        { title: '40+ Years of Expertise', desc: 'Shafiq and Sons has been making furniture since the 1980s. That experience shows in every piece.' },
        { title: 'Your Custom Design',    desc: 'Size, colour, wood, hardware, everything according to your preference. Want something beyond the ordinary? We\'re here.' },
        { title: 'Lifetime Guarantee',    desc: 'Every piece comes with a structural guarantee. Good furniture is bought once, for a lifetime.' },
      ],
    },
    contact: {
      label:        'Get in Touch',
      title1:       'Your Dream,',
      title2:       'Our Craft',
      sub:          'Want something special for your home? Contact us, 40 years of experience is at your service. Most inquiries receive a reply within 24 hours.',
      waBtn:        'Chat on WhatsApp',
      orText:       'or fill in the form',
      fact1Label:   'Response Time',
      fact1Value:   'Within 24 hours',
      fact2Label:   'Lead Time',
      fact2Value:   'Custom pieces: 5–8 Days',
      fact3Label:   'Delivery',
      fact3Value:   'Nationwide delivery across Pakistan',
      formTitle:    'Send Us a Message',
      nameLabel:    'Full Name *',
      namePlaceholder: 'Your name',
      emailLabel:   'Email Address *',
      emailPlaceholder: 'you@example.com',
      phoneLabel:   'Phone / WhatsApp *',
      phonePlaceholder: '03XX-XXXXXXX',
      typeLabel:    'Inquiry Type',
      typePlaceholder: 'Select…',
      msgLabel:     'Your Message *',
      msgPlaceholder: 'Describe the piece you have in mind, dimensions, wood type, colour preference…',
      submitIdle:   'Send Message →',
      submitBusy:   'Sending…',
      errorMsg:     'Something went wrong, please try again or use WhatsApp.',
      successTitle: 'Message Received!',
      successDesc:  "Thank you for reaching out. We'll get back to you within 24 hours. InshAllah.",
      successBtn:   'Send Another',
      inquiryTypes: [
        'General Inquiry',
        'Custom Order Request',
        'Product Information',
        'Pricing & Quote',
        'Other',
      ],
    },
    card: {
      overlayBtn: 'Inquire via WhatsApp',
      quoteBtn:   'Get a Quote',
      waMsg:      (name, material) =>
        `Hi! I'm interested in the "${name}" (${material}). Could you please provide more details?`,
    },
    footer: {
      tagline:      '40+ years of premium handcrafted wood furniture in Pakistan. Every piece is made with love.',
      navTitle:     'Navigation',
      contactTitle: 'Contact',
      email:        'abdulahad53688@gmail.com',
      phone:        '+92 309 7427276',
      address:      'Lahore, Punjab, Pakistan',
      hours:        'Sat–Thu: 9 am – 7 pm',
      copy:         year => `© ${year} Shafiq and Sons. All Rights Reserved.`,
      madeWith:     'Made with 🪵 & craft',
    },
  },

  ur: {
    nav: {
      home:    'ہوم',
      gallery: 'گیلری',
      about:   'ہمارے بارے',
      contact: 'رابطہ',
      cta:     'قیمت معلوم کریں',
    },
    hero: {
      label:  '1980 کی دہائی سے, میڈ اِن پاکستان',
      title1: '40+ سال کی',
      title2: 'محبت اور ہنر',
      sub:    'شفیق اینڈ سنز,  پاکستان کی ایک معتمد فرنیچر کمپنی جو 1980 کی دہائی سے اعلیٰ معیار کا دستکاری فرنیچر بنا رہی ہے۔ آپ کے گھر کے لیے، آپ کی پسند کے مطابق۔',
      btn1:   'کلیکشن دیکھیں',
      btn2:   'کسٹم آرڈر کریں',
      stat1:  'سال کا تجربہ',
      stat2:  'خوش گاہک',
      stat3:  'اصلی لکڑی',
    },
    gallery: {
      label:        'ہمارا کلیکشن',
      title:        'ہر گھر کے لیے کچھ خاص',
      sub:          'لیونگ روم، بیڈروم، ڈائننگ یا آفس, شفیق اینڈ سنز کا 40 سال کا تجربہ آپ کی پسند کے مطابق فرنیچر تیار کرتا ہے۔',
      bannerTitle:  'کوئی بھی ڈیزائن عام نہیں؟',
      bannerDesc:   'ہر فرنیچر آپ کی مرضی کے مطابق سائز، رنگ اور فنش میں بن سکتا ہے۔',
      bannerBtn:    'کسٹم آرڈر بھیجیں',
      categories: {
        all:     'تمام پیسز',
        living:  'لیونگ روم',
        bedroom: 'بیڈروم',
        dining:  'ڈائننگ',
        office:  'آفس',
        outdoor: 'آؤٹ ڈور',
      },
    },
    about: {
      label:  'ہماری کہانی',
      title1: 'لاہور کی ورشت،',
      title2: 'پاکستان کا فخر',
      lead:   'شفیق اینڈ سنز کی بنیاد 1980 کی دہائی میں لاہور میں رکھی گئی, ایک چھوٹی سی دکان سے جو آج پاکستان کی محترم فرنیچر برانڈ بن گئی ہے۔',
      body:   'ہم مانتے ہیں کہ فرنیچر صرف خریدنے کی چیز نہیں، یہ گھر کی جان ہوتی ہے۔ ہر ڈوویٹیل جوائنٹ، ہر پالشڈ کونے میں 40 سال کا تجربہ چھپا ہوتا ہے۔ آج بھی ہر پیس ہاتھ سے بنتا ہے, کوئی شارٹ کٹ نہیں، کوئی ایم ڈی ایف نہیں۔',
      values: [
        { title: 'میڈ اِن پاکستان',       desc: 'ہر چیز پاکستان میں تیار ہوتی ہے۔ مقامی کاریگر، مقامی لکڑی، مگر معیار بین الاقوامی سطح کا۔' },
        { title: '40+ سال کا تجربہ',       desc: 'شفیق اینڈ سنز 1980 کی دہائی سے فرنیچر بنا رہی ہے۔ یہ تجربہ ہر پیس میں نظر آتا ہے۔' },
        { title: 'اپنی مرضی کا ڈیزائن',   desc: 'سائز، رنگ، لکڑی، کاشی, ہر چیز آپ کی پسند کے مطابق۔ عام سے کچھ زیادہ بنانا ہے تو ہم ہیں۔' },
        { title: 'عمر بھر کی گارنٹی',     desc: 'ہر پیس پر سٹرکچرل گارنٹی دی جاتی ہے۔ اچھا فرنیچر ایک بار خریدا جاتا ہے, ہمیشہ کے لیے۔' },
      ],
    },
    contact: {
      label:        'رابطہ کریں',
      title1:       'آپ کا خواب،',
      title2:       'ہمارا کام',
      sub:          'اپنے گھر کے لیے کچھ خاص بنانا چاہتے ہیں؟ ہم سے رابطہ کریں, 40 سال کی تجربہ کاری آپ کی خدمت میں حاضر ہے۔ 24 گھنٹے میں جواب ملے گا۔',
      waBtn:        'واٹس ایپ پر بات کریں',
      orText:       'یا فارم بھریں',
      fact1Label:   'جواب کا وقت',
      fact1Value:   '24 گھنٹے کے اندر',
      fact2Label:   'تیاری کا وقت',
      fact2Value:   'کسٹم فرنیچر: 5–8 دن',
      fact3Label:   'ڈیلیوری',
      fact3Value:   'پورے پاکستان میں ڈیلیوری',
      formTitle:    'پیغام بھیجیں',
      nameLabel:    'آپ کا نام *',
      namePlaceholder: 'اپنا نام لکھیں',
      emailLabel:   'ای میل ایڈریس *',
      emailPlaceholder: 'aap@example.com',
      phoneLabel:   'فون / واٹس ایپ *',
      phonePlaceholder: '03XX-XXXXXXX',
      typeLabel:    'درخواست کی قسم',
      typePlaceholder: 'منتخب کریں…',
      msgLabel:     'آپ کا پیغام *',
      msgPlaceholder: 'فرنیچر کا نام، سائز، لکڑی کی قسم، یا کوئی مخصوص ضرورت لکھیں…',
      submitIdle:   'پیغام بھیجیں ←',
      submitBusy:   'بھیجا جا رہا ہے…',
      errorMsg:     'کچھ غلط ہوا, دوبارہ کوشش کریں یا واٹس ایپ استعمال کریں۔',
      successTitle: 'پیغام پہنچ گیا!',
      successDesc:  'شکریہ! ہم 24 گھنٹے کے اندر آپ سے رابطہ کریں گے۔ انشاءاللہ۔',
      successBtn:   'دوبارہ لکھیں',
      inquiryTypes: [
        'عام معلومات',
        'کسٹم آرڈر',
        'پروڈکٹ کی معلومات',
        'قیمت اور کوٹیشن',
        'دیگر',
      ],
    },
    card: {
      overlayBtn: 'واٹس ایپ پر پوچھیں',
      quoteBtn:   'واٹس ایپ پر پوچھیں',
      waMsg:      (name, material) =>
        `السلام و علیکم! مجھے "${name}" (${material}) کے بارے میں معلومات چاہیے۔ کرپیا تفصیلات بتائیں۔`,
    },
    footer: {
      tagline:      '40 سال سے زیادہ عرصے سے پاکستان میں اعلیٰ معیار کا دستکاری فرنیچر۔ ہر چیز محبت سے تیار ہوتی ہے۔',
      navTitle:     'نیویگیشن',
      contactTitle: 'رابطہ',
      email:        'abdulahad53688@gmail.com',
      phone:        '+92 309 7427276',
      address:      'لاہور، پنجاب، پاکستان',
      hours:        'ہفتہ–جمعرات: صبح 9 – شام 7',
      copy:         year => `© ${year} شفیق اینڈ سنز۔ تمام حقوق محفوظ۔`,
      madeWith:     '🪵 اور محبت سے بنایا گیا',
    },
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ur')
  const t = strings[lang]
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
