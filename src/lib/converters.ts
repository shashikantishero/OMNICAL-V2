export const categories = {
  Length: {
    'Meters (m)': 1,
    'Kilometers (km)': 1000,
    'Centimeters (cm)': 0.01,
    'Millimeters (mm)': 0.001,
    'Miles (mi)': 1609.34,
    'Yards (yd)': 0.9144,
    'Feet (ft)': 0.3048,
    'Inches (in)': 0.0254,
  },
  Weight: {
    'Kilograms (kg)': 1,
    'Grams (g)': 0.001,
    'Milligrams (mg)': 0.000001,
    'Pounds (lb)': 0.453592,
    'Ounces (oz)': 0.0283495,
  },
  Temperature: {
    Celsius: 'celsius',
    Fahrenheit: 'fahrenheit',
    Kelvin: 'kelvin',
  },
  Area: {
    'Square Meters (m²)': 1,
    'Square Kilometers (km²)': 1000000,
    'Square Miles (mi²)': 2589990,
    'Acres (ac)': 4046.86,
    'Hectares (ha)': 10000,
  },
  Volume: {
    'Liters (L)': 1,
    'Milliliters (mL)': 0.001,
    'Cubic Meters (m³)': 1000,
    'Gallons (US gal)': 3.78541,
    'Quarts (US qt)': 0.946353,
  },
};

export const convert = (
  value: number,
  fromUnit: string,
  toUnit: string,
  category: keyof typeof categories
): number => {
  if (category === 'Temperature') {
    if (fromUnit === toUnit) return value;
    let celsius: number;
    switch (fromUnit) {
      case 'Celsius': celsius = value; break;
      case 'Fahrenheit': celsius = (value - 32) * 5 / 9; break;
      case 'Kelvin': celsius = value - 273.15; break;
      default: return NaN;
    }
    switch (toUnit) {
      case 'Celsius': return celsius;
      case 'Fahrenheit': return (celsius * 9 / 5) + 32;
      case 'Kelvin': return celsius + 273.15;
      default: return NaN;
    }
  } else {
    const fromFactor = categories[category][fromUnit as keyof typeof categories[typeof category]];
    const toFactor = categories[category][toUnit as keyof typeof categories[typeof category]];
    if (typeof fromFactor !== 'number' || typeof toFactor !== 'number') return NaN;
    const valueInBase = value * fromFactor;
    return valueInBase / toFactor;
  }
};
