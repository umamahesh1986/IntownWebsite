# IntownApp - Single Page Application

A modern, responsive single page application design, built with React and featuring an orange color scheme.

## Features

- **Modern Design**: Clean, minimalist design with smooth animations
- **Orange Theme**: Custom orange color scheme (#ff6b35, #ff8c42) instead of black
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Component-Based**: Modular React components for easy maintenance

## Sections

1. **Header**: Fixed navigation with logo and download button
2. **Hero**: Main landing section with app mockup
3. **Features**: Key features and benefits
4. **Upgrades**: Premium services and upgrades
5. **Payments**: Payment features and capabilities
6. **Footer**: Links and company information

## Technologies Used

- React 18
- Framer Motion (for animations)
- CSS3 (with modern features)
- HTML5
- Responsive Design

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd IntownApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and visit `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

This will create an optimized build in the `build` folder.

## Project Structure

```
IntownApp/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── Hero.js
│   │   ├── Hero.css
│   │   ├── Features.js
│   │   ├── Features.css
│   │   ├── Upgrades.js
│   │   ├── Upgrades.css
│   │   ├── Payments.js
│   │   ├── Payments.css
│   │   ├── Footer.js
│   │   └── Footer.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Customization

### Colors

The main orange theme colors are defined in CSS custom properties:
- Primary Orange: `#ff6b35`
- Secondary Orange: `#ff8c42`

### Typography

The application uses the Inter font family for a modern, clean look.

### Animations

Animations are powered by Framer Motion and can be customized in each component's CSS file.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes only.

## Credits
