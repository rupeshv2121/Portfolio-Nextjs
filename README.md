# 🚀 Portfolio Website - Full Stack Developer Showcase

A modern, responsive portfolio website built with Next.js, TypeScript, and Firebase. Features real-time contact forms, email notifications, and interactive skill visualizations.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://portfolio-nextjs-blush.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/rupeshv2121/Portfolio-Nextjs)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🎯 Features

### 🎨 **Modern UI/UX**
- Responsive design optimized for all devices (mobile, tablet, desktop)
- Smooth scroll navigation with active section highlighting
- Gradient color schemes with custom animations
- Interactive hover effects and transitions
- Custom loading animations

### 📧 **Contact System**
- Real-time form submissions stored in Firebase Firestore
- Automated email notifications to admin
- Confirmation emails sent to users
- Loading states and error handling
- Form validation with TypeScript

### 💼 **Professional Sections**
- **Hero Section** - Eye-catching introduction with CTA buttons
- **About Me** - Professional bio with profile image
- **Education** - Academic qualifications with timeline
- **Experience** - Work history with detailed descriptions
- **Projects** - Portfolio showcase with live demos and source code
- **Skills** - Interactive skill bars with proficiency levels
- **Certifications** - Professional achievements and awards
- **Contact** - Integrated contact form with email functionality

### 🛠️ **Technical Features**
- Server-Side Rendering (SSR) for improved SEO
- Type-safe codebase with TypeScript
- Component-based architecture
- Optimized images with Next.js Image component
- Environment variable configuration
- Firebase Firestore integration
- Email service with Nodemailer

## 🚀 Tech Stack

### **Frontend**
- [Next.js 15](https://nextjs.org/) - React framework
- [React.js](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Lucide React](https://lucide.dev/) - Icons

### **Backend**
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Serverless functions
- [Node.js](https://nodejs.org/) - Runtime environment
- [Nodemailer](https://nodemailer.com/) - Email service

### **Database & Cloud**
- [Firebase Firestore](https://firebase.google.com/docs/firestore) - NoSQL database
- [Vercel](https://vercel.com/) - Deployment platform

### **Development Tools**
- [pnpm](https://pnpm.io/) - Package manager
- [ESLint](https://eslint.org/) - Linting
- [Git](https://git-scm.com/) - Version control

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- pnpm installed (or npm/yarn)
- Firebase account
- Gmail account for email notifications

### 1. Clone the Repository
```bash
git clone https://github.com/rupeshv2121/Portfolio-Nextjs.git
cd Portfolio-Nextjs
```

### 2. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Gmail Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

### 4. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Firestore Database
4. Update Firestore Security Rules:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{contactId} {
      allow read: if false;
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'subject', 'message', 'timestamp'])
                    && request.resource.data.name is string
                    && request.resource.data.email is string
                    && request.resource.data.email.matches('.*@.*\\..*');
    }
    
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 5. Set Up Gmail App Password

1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Create a new app password for "Mail"
3. Copy the 16-character password
4. Add it to `.env.local` as `GMAIL_APP_PASSWORD`

### 6. Run Development Server
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
Portfolio-Nextjs/
├── app/
│   ├── api/
│   │   └── send-email/
│   │       └── route.ts          # Email API endpoint
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main portfolio page
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── modern-loader.tsx          # Loading animation
│   └── theme-provider.tsx         # Theme configuration
├── lib/
│   ├── firebase.ts                # Firebase configuration
│   └── utils.ts                   # Utility functions
├── public/
│   └── GP4845.jpg                 # Profile image
├── .env.local                     # Environment variables
├── components.json                # shadcn/ui config
├── next.config.mjs                # Next.js config
├── package.json                   # Dependencies
├── tailwind.config.ts             # Tailwind config
└── tsconfig.json                  # TypeScript config
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Import your repository
4. Add environment variables in Vercel:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - All Firebase variables (NEXT_PUBLIC_*)
5. Deploy!

### Environment Variables for Vercel
Make sure to add all variables from `.env.local` to Vercel's environment variables section.

## 🎨 Customization

### Update Personal Information
Edit `app/page.tsx` to update:
- Personal bio and description
- Education details
- Work experience
- Projects showcase
- Skills and proficiency levels
- Certifications and achievements
- Social media links

### Modify Skills
Update the skills array in the Skills section:
```typescript
{
  name: "Your Skill",
  level: 85 // 0-100
}
```

### Change Theme Colors
Modify gradient colors in Tailwind classes:
```tsx
className="bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500"
```

### Add New Projects
Add new project objects to the projects array in the Projects section.

## 📧 Email Configuration

The contact form sends emails to both you and the user:
- **Admin notification**: Receives all form submissions
- **User confirmation**: Sends automatic thank you message

Email templates can be customized in `app/api/send-email/route.ts`

## 🔒 Security

- Environment variables stored securely
- Firebase security rules implemented
- Form validation on both client and server
- XSS protection with React
- CSRF protection with Next.js

## 🐛 Troubleshooting

### Email not sending
- Verify Gmail App Password is correct (16 characters without spaces)
- Check if 2-Step Verification is enabled on Gmail
- Ensure environment variables are set in Vercel

### Firebase permission denied
- Update Firestore security rules as shown above
- Verify Firebase configuration in `.env.local`

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && pnpm install`

## 📊 Performance

- **Lighthouse Score**: 95+
- **Page Load Time**: <200ms
- **First Contentful Paint**: <1s
- **Time to Interactive**: <2s

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Rupesh Varshney**
- Website: [portfolio-nextjs-blush.vercel.app](https://portfolio-nextjs-blush.vercel.app/)
- GitHub: [@rupeshv2121](https://github.com/rupeshv2121)
- LinkedIn: [rupeshvarshney](https://www.linkedin.com/in/rupeshvarshney/)
- Email: rupeshvarshney7@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for hosting
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Firebase](https://firebase.google.com/) for backend services

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by Rupesh Varshney | 🚩 Jai Siya Ram 🚩
