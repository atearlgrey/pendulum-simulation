# Pendulum Simulation

This project is a 3D pendulum simulation built using [Three.js](https://threejs.org/) and [Vite](https://vitejs.dev/).

## Features
- Realistic pendulum physics simulation.
- Modularized code structure for better maintainability.
- Interactive controls for adjusting pendulum properties.

## Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)

## Getting Started

### 1. Install Dependencies
Run the following command to install the required dependencies:
```bash
npm install
```

### 2. Start Development Server
To start the development server, run:
```bash
npm run dev
```
This will start the server and open the application in your default browser.

### 3. Build the Project
You can build the project for different environments:
- **Development Build**:
  ```bash
  npm run build:dev
  ```
- **Staging Build**:
  ```bash
  npm run build:staging
  ```
- **Production Build**:
  ```bash
  npm run build:prod
  ```

The build output will be located in the `dist/` directory.

### 4. Serve the Build
To serve the built project using Nginx or any static file server, ensure the `dist/` directory is used as the root.

## Project Structure
- `src/`: Contains the source code.
- `modules/`: Modularized components like scene setup, pendulum logic, etc.
- `dist/`: Contains the build output.

## License
This project is licensed under the ISC License.