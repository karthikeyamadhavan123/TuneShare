const countries = [
    { name: "United States", flag: "🇺🇸" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "France", flag: "🇫🇷" },
    { name: "Italy", flag: "🇮🇹" },
    { name: "Spain", flag: "🇪🇸" },
    { name: "Japan", flag: "🇯🇵" },
    { name: "China", flag: "🇨🇳" },
    { name: "India", flag: "🇮🇳" },
    { name: "Brazil", flag: "🇧🇷" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "Russia", flag: "🇷🇺" },
    { name: "South Korea", flag: "🇰🇷" },
    { name: "Mexico", flag: "🇲🇽" },
    { name: "South Africa", flag: "🇿🇦" },
    { name: "Argentina", flag: "🇦🇷" },
    { name: "Saudi Arabia", flag: "🇸🇦" },
    { name: "Turkey", flag: "🇹🇷" },
    { name: "Netherlands", flag: "🇳🇱" },
];

export const useCountries = () => {
   return countries.map((country)=>{
    return country
   })
}