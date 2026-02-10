import React from 'react'
import Particles from 'react-particles-js'
import { background } from '../../profile'

const ParticlesBackground = () => {
    return (
        <div className="particle">
            { background.type === 'Snow' && <Particles
            height="100vh"
            width="100%"
                params={{
                "particles": {
                    "number": {
                        "value": 50,
                        "density": {
                            "enable": false
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "opacity": {
                        "value": 0.8,
                        "random": true
                    },
                    "size": {
                        "value": 7,
                        "random": true,
                        "anim": {
                            "size_min": 2,
                            "enable": true
                        }
                    },
                    "move": {
                        "direction": "bottom",
                        "out_mode": "out",
                        "speed": 1.5
                    },
                    "line_linked": {
                        "enable": false
                    },
                    "shape": {
                        "type": "circle"
                    }
                },
                "interactivity": {
                    "events": {
                        "onclick": {
                            "enable": true,
                            "mode": "remove"
                        }
                    },
                    "modes": {
                        "remove": {
                            "particles_nb": 5
                        }
                    }
                }
            }} />}
            { background.type === 'Particle' && <Particles
            height= "100vh"
            width= "100vw"
            params={{
            "particles": {
                "collisions": {
                    "enable": true
                },
                "number": {
                    "value": 100,
                    "density": {
                        "enable": false
                    }
                },
                "color": "#000",
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "speed": 4,
                        "size_min": 0.3
                    }
                },
                "line_linked": {
                    "enable": true,
                    "color": "#000"
                },
                "move": {
                    "random": true,
                    "speed": 1,
                    "direction": "bottom",
                    "out_mode": "out"
                }
            },
            "interactivity": {
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    }
                },
                "modes": {
                    "bubble": {
                        "distance": 250,
                        "duration": 2,
                        "size": 6,
                        "opacity": 0.4
                    },
                    "push": {
                        "particles_nb": 5
                    }
                },
                "retina_detect": true
            }
        }} />}
        </div>
    )
}

export default ParticlesBackground
