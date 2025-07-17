export const physicsFormulas = {
    Mechanics: [
      {
        name: 'Force (F = ma)',
        inputs: [{ name: 'Mass (m)', unit: 'kg' }, { name: 'Acceleration (a)', unit: 'm/s²' }],
        output: { name: 'Force (F)', unit: 'N' },
        calculate: (inputs: number[]) => inputs[0] * inputs[1],
      },
      {
        name: 'Kinetic Energy (KE = 0.5mv²)',
        inputs: [{ name: 'Mass (m)', unit: 'kg' }, { name: 'Velocity (v)', unit: 'm/s' }],
        output: { name: 'Kinetic Energy (KE)', unit: 'J' },
        calculate: (inputs: number[]) => 0.5 * inputs[0] * Math.pow(inputs[1], 2),
      },
    ],
    Electricity: [
      {
        name: "Ohm's Law (V = IR)",
        inputs: [{ name: 'Current (I)', unit: 'A' }, { name: 'Resistance (R)', unit: 'Ω' }],
        output: { name: 'Voltage (V)', unit: 'V' },
        calculate: (inputs: number[]) => inputs[0] * inputs[1],
      },
      {
        name: "Electrical Power (P = VI)",
        inputs: [{ name: 'Voltage (V)', unit: 'V' }, { name: 'Current (I)', unit: 'A' }],
        output: { name: 'Power (P)', unit: 'W' },
        calculate: (inputs: number[]) => inputs[0] * inputs[1],
      },
    ]
};

export const chemistryFormulas = {
    Solutions: [
      {
        name: 'Molarity (M = mol/L)',
        inputs: [{ name: 'Moles of solute (mol)', unit: 'mol' }, { name: 'Volume of solution (L)', unit: 'L' }],
        output: { name: 'Molarity (M)', unit: 'mol/L' },
        calculate: (inputs: number[]) => inputs[0] / inputs[1],
      },
    ],
    "Gas Laws": [
        {
            name: 'Ideal Gas Law (PV=nRT)',
            inputs: [{ name: 'Pressure (P)', unit: 'atm' }, { name: 'Volume (V)', unit: 'L' }, { name: 'Moles (n)', unit: 'mol' }],
            output: { name: 'Temperature (T)', unit: 'K' },
            calculate: (inputs: number[]) => (inputs[0] * inputs[1]) / (inputs[2] * 0.08206),
        }
    ]
};
