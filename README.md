# 📰 News 24h Application

> Final project for the Frontend Programming course - Group 2 (HCMUAF).

**News 24h** is a modern, responsive news aggregation application that allows users to browse, search, and read news articles from various categories. It leverages RSS feeds from [24h.com.vn](https://www.24h.com.vn/) to provide up-to-date information locally with a clean user interface.

## 👥 Contributors

| Role       | Name              | Student ID |
| :--------- | :---------------- | :--------- |
| **Leader** | **Tran Nhut Anh** | 22130015   |
| Member     | Nguyen Phi Long   |            |
| Member     | Nguyen Thanh Kỳ   |            |

## ✨ Features

- **Real-time News Feed**: Fetches data dynamically using RSS feeds.
- **Categorized Browsing**: View news by categories like Football, Hi-tech, Entertainment, Security, etc.
- **Article Details**: Read full articles with parsed content, images, and formatting.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile viewing.
- **Modern UI/UX**: Built with a sleek design system using Tailwind CSS and Radix UI primitives.
- **Data Visualization**: Integrated charts for stats (e.g., Gold Price - if applicable).
- **Search Functionality**: Quickly find articles by keywords.

## 🛠 Tech Stack

### Core

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

### Styling & UI

- **CSS Framework**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Headless UI**: [Radix UI](https://www.radix-ui.com/) (Primitives for accessible components)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)

### State Management & Logic

- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Data Handling

- **HTTP Client**: [Axios](https://axios-http.com/)
- **Parsing**: `fast-xml-parser`, `cheerio`, `rss-parser`
- **Charts**: [Recharts](https://recharts.org/)

## 📂 Project Structure

```bash
src/
├── components/   # Reusable UI components (News cards, Layouts, Common widgets)
├── constant/     # Static data and configuration (Categories, Authors)
├── hooks/        # Custom React hooks (useRSS, API hooks)
├── lib/          # Utility functions (Parsers, Formatters)
├── pages/        # Main application pages (Home, Category, Detail)
├── services/     # API service layer
├── stores/       # Redux store configuration and slices
├── types/        # TypeScript type definitions
├── App.tsx       # Main App component
└── main.tsx      # Entry point
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** or **pnpm** (npm v9+ recommended)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/anh09/news24h.git
    cd news24h
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**

    ```bash
    npm run dev
    # or
    npx vite
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` (or the port shown in your terminal).

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Type-checks and builds the project for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run preview`: Previews the production build locally.

---

_This project is for educational purposes only._
