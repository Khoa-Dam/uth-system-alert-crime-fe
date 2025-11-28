# GuardM - Crime Alert & Safety System

🌐 **Live Website:** [https://www.guardm.space/](https://www.guardm.space/)

GuardM is a modern, comprehensive web application designed to enhance community safety through real-time crime reporting, interactive mapping, and safety alerts. Built with the latest web technologies, it provides a seamless experience for users to stay informed and safe.

![GuardM Preview](/public/og.png)

## 🚀 Features

- **Interactive Crime Map**: Visualize crime reports and safety incidents on a dynamic map using Leaflet.
- **Real-time Reporting**: Users can submit reports about incidents, suspicious activities, or safety hazards.
- **Wanted Persons Database**: Searchable database of wanted persons with detailed information.
- **Weather Integration**: Real-time weather updates and alerts to help users plan safely.
- **Admin Dashboard**: Comprehensive tools for administrators to manage reports, users, and system data.
- **PWA Support**: Installable as a Progressive Web App for a native-like experience on mobile and desktop.
- **Dark/Light Mode**: Fully supported theme switching with system preference detection.
- **Responsive Design**: Optimized for all devices, from mobile phones to large desktop screens.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (RC)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Maps**: [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/) & [Tailwind Animate](https://github.com/jamiebuilds/tailwindcss-animate)

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended), npm, or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Khoa-Dam/GuardM-fe.git
    cd GuardM-fe
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Environment Setup:**

    Create a `.env` file in the root directory and configure the necessary environment variables. You can use `.env.example` as a reference if available.

    ```env
    # Example variables
    DATABASE_URL="your_database_url"
    NEXTAUTH_SECRET="your_nextauth_secret"
    NEXTAUTH_URL="http://localhost:3000"
    # Add other API keys (Weather, Maps, etc.)
    ```

4.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages and layouts
│   ├── (auth)/          # Authentication routes (login, signup)
│   ├── (landing-page)/  # Public landing page
│   ├── (protected)/     # Protected routes (dashboard, map, etc.)
│   └── api/             # API routes
├── components/          # Reusable UI components
│   ├── ui/              # Shadcn UI primitives
│   └── ...              # Feature-specific components
├── config/              # Site configuration
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and libraries
├── providers/           # Context providers (Theme, Auth, Query)
├── service/             # API service layer
├── styles/              # Global styles
└── types/               # TypeScript type definitions
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Author**: Kaito (Khoa Dam)
- **Email**: dmangockhoa0703@gmail.com
- **GitHub**: [Khoa-Dam](https://github.com/Khoa-Dam)
