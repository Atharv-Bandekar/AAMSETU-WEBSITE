/**
 * Mango Leaves Animation v1.0.0
 * A customizable falling mango leaves animation that triggers after mouse inactivity
 * 
 * Usage:
 * 1. Include this script in your webpage
 * 2. Call MangoLeavesAnimation.init() to initialize with default settings
 * 3. Or call MangoLeavesAnimation.init({ custom settings }) to customize
 */

const MangoLeavesAnimation = (function() {
    // Default configuration
    const defaultConfig = {
        inactivityTimeout: 5000,      // How long before detecting inactivity (ms)
        leafLifetime: 3000,           // How long each leaf stays visible before falling (ms)
        fallDuration: 2000,           // How long the falling animation takes (ms)
        decayDuration: 3000,          // How long the decay animation takes (ms)
        trailDuration: 2000,          // How long the leaf trail lasts (ms)
        leafInterval: 150,            // Interval between leaf creation (ms)
        leafPath: "M10,0 C14,3 20,8 20,16 C20,24 14,30 10,32 C6,30 0,24 0,16 C0,8 6,3 10,0 Z", // Slim, pointed mango leaf
        leafColorStages: [            // Color progression as leaves decay
            "#4CAF50", // Fresh green
            "#8BC34A", // Light green
            "#CDDC39", // Yellow-green
            "#FFC107", // Yellow
            "#FF9800", // Orange
            "#A1887F", // Light brown
            "#795548"  // Brown
        ],
        minSize: 30,                  // Minimum leaf size in pixels
        maxSize: 50,                  // Maximum leaf size in pixels
        zIndex: 1000                  // Z-index for leaves (ensure they appear above content)
    };

    // Variables
    let config = {};
    let lastMouseMoveTime = 0;
    let mouseActive = true;
    let mouseX = 0;
    let mouseY = 0;
    let leafInterval = null;
    let initialized = false;

    // Add required CSS
    function addStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .mango-leaf {
                position: absolute;
                pointer-events: none;
                z-index: ${config.zIndex};
                transition: transform ${config.fallDuration/1000}s ease-in, opacity ${config.fallDuration/1000}s ease-out;
            }
        `;
        document.head.appendChild(styleElement);
    }

    // Create a mango leaf element
    function createMangoLeaf(x, y) {
        const leaf = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        leaf.setAttribute("class", "mango-leaf");
        leaf.setAttribute("width", "40");
        leaf.setAttribute("height", "40");
        leaf.setAttribute("viewBox", "0 0 20 32");
        
        // Create leaf body
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", config.leafPath);
        path.setAttribute("fill", config.leafColorStages[0]);
        
        // Create leaf stem
        const stem = document.createElementNS("http://www.w3.org/2000/svg", "path");
        stem.setAttribute("d", "M10,32 C10,34 10,36 10,38");
        stem.setAttribute("stroke", "#795548");
        stem.setAttribute("stroke-width", "1");
        stem.setAttribute("fill", "none");
        
        // Create leaf veins
        const veins = document.createElementNS("http://www.w3.org/2000/svg", "path");
        veins.setAttribute("d", "M10,6 C10,16 10,26 10,32 M10,10 C6,14 3,16 1,18 M10,10 C14,14 17,16 19,18 M10,16 C7,18 4,19 2,20 M10,16 C13,18 16,19 18,20");
        veins.setAttribute("stroke", "#388E3C");
        veins.setAttribute("stroke-width", "0.5");
        veins.setAttribute("fill", "none");
        
        // Size and rotation variations
        const size = config.minSize + Math.random() * (config.maxSize - config.minSize);
        const rotation = Math.random() * 360;
        const flipX = Math.random() > 0.5 ? -1 : 1;
        
        leaf.appendChild(path);
        leaf.appendChild(stem);
        leaf.appendChild(veins);
        document.body.appendChild(leaf);
        
        // Position and style the leaf
        leaf.style.width = `${size}px`;
        leaf.style.height = `${size}px`;
        leaf.style.left = `${x - size/2}px`;
        leaf.style.top = `${y - size/2}px`;
        leaf.style.transform = `rotate(${rotation}deg) scaleX(${flipX})`;
        
        // Store the initial values for animation
        const leafData = {
            element: leaf,
            path: path,
            veins: veins,
            x: x - size/2,
            y: y - size/2,
            rotation: rotation,
            flipX: flipX,
            size: size,
            colorIndex: 0
        };
        
        // Start leaf lifecycle
        setTimeout(() => startLeafFalling(leafData), config.leafLifetime);
        
        return leafData;
    }
    
    // Function to make leaf fall and decay
    function startLeafFalling(leafData) {
        const { element, path, veins, x, y, rotation, flipX, size } = leafData;
        
        // Calculate final position (falling down)
        const finalY = window.innerHeight + 50; // Below the viewport
        const fallDistance = finalY - y;
        
        // Random horizontal drift as leaf falls
        const drift = (Math.random() - 0.5) * 200;
        
        // Additional rotation as leaf falls (1-3 full rotations)
        const additionalRotation = (Math.random() * 2 + 1) * 360;
        
        // Start decay animation
        startLeafDecay(leafData);
        
        // Apply falling animation
        element.style.transition = `transform ${config.fallDuration/1000}s ease-in, opacity ${config.fallDuration/1000}s ease-out`;
        element.style.transform = `translate(${drift}px, ${fallDistance}px) rotate(${rotation + additionalRotation}deg) scaleX(${flipX})`;
        
        // Remove leaf after animation completes
        setTimeout(() => {
            element.remove();
        }, config.fallDuration);
    }
    
    // Function to change leaf color gradually (decay effect)
    function startLeafDecay(leafData) {
        const { element, path, veins, colorIndex } = leafData;
        
        // Progress to next color in decay sequence
        if (colorIndex < config.leafColorStages.length - 1) {
            leafData.colorIndex++;
            const newColor = config.leafColorStages[leafData.colorIndex];
            
            // Apply new color to leaf
            path.setAttribute("fill", newColor);
            
            // Fade out veins as leaf decays
            const veinOpacity = 1 - (leafData.colorIndex / (config.leafColorStages.length - 1));
            veins.setAttribute("stroke-opacity", veinOpacity.toString());
            
            // Continue decay animation if not reached final color
            setTimeout(() => startLeafDecay(leafData), config.decayDuration / (config.leafColorStages.length - 1));
        }
    }
    
    // Function to start trailing animation
    function startLeafTrail() {
        if (leafInterval) clearInterval(leafInterval);
        
        leafInterval = setInterval(() => {
            if (mouseActive) {
                createMangoLeaf(mouseX, mouseY);
            }
        }, config.leafInterval);
        
        // Stop trail after configured duration
        setTimeout(() => {
            clearInterval(leafInterval);
            leafInterval = null;
        }, config.trailDuration);
    }
    
    // Mouse move event listener
    function handleMouseMove(e) {
        const currentTime = Date.now();
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Check if mouse was inactive and now is active
        if (!mouseActive && (currentTime - lastMouseMoveTime) >= config.inactivityTimeout) {
            mouseActive = true;
            startLeafTrail();
        }
        
        lastMouseMoveTime = currentTime;
    }
    
    // Check for inactivity
    function checkInactivity() {
        const currentTime = Date.now();
        if (currentTime - lastMouseMoveTime >= config.inactivityTimeout) {
            mouseActive = false;
        }
    }

    // Initialize the animation
    function init(customConfig = {}) {
        // Prevent multiple initializations
        if (initialized) return;
        
        // Merge default config with custom config
        config = {...defaultConfig, ...customConfig};
        
        // Add styles to the document
        addStyles();
        
        // Set initial mouse time
        lastMouseMoveTime = Date.now();
        
        // Add event listener for mouse movement
        document.addEventListener('mousemove', handleMouseMove);
        
        // Start inactivity checking
        setInterval(checkInactivity, 1000);
        
        initialized = true;
    }

    // Cleanup function to remove event listeners
    function destroy() {
        if (!initialized) return;
        
        document.removeEventListener('mousemove', handleMouseMove);
        
        if (leafInterval) {
            clearInterval(leafInterval);
            leafInterval = null;
        }
        
        // Remove all existing leaves
        const leaves = document.querySelectorAll('.mango-leaf');
        leaves.forEach(leaf => leaf.remove());
        
        initialized = false;
    }

    // Return public API
    return {
        init,
        destroy,
        config: defaultConfig  // Expose default config for reference
    };
})();

// Auto-initialize if window.autoInitMangoLeaves is true
if (typeof window !== 'undefined' && window.autoInitMangoLeaves) {
    document.addEventListener('DOMContentLoaded', () => {
        MangoLeavesAnimation.init();
    });
}