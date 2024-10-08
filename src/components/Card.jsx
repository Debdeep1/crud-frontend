
// components/Card.tsx
export default function Card({ link, icon, title, value }) {
    return (
      <a href={link} className="bg-white p-4 shadow-md rounded-lg flex items-center space-x-4">
        <span className="text-3xl">{icon}</span>
        <div>
          <h2 className="text-lg font-bold ">{title}</h2>
          <p className="text-sm text-gray-500">{value}</p>
        </div>
      </a>
    );
  }
  