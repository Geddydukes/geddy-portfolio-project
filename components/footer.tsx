export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Geddy Dukes. All rights reserved.</p>
        <p className="mt-2">
          <a href="mailto:geddydukes@gmail.com" className="hover:text-primary transition-colors duration-200">
            geddydukes@gmail.com
          </a>
          {" | "}
          <a href="tel:707-799-1271" className="hover:text-primary transition-colors duration-200">
            707-799-1271
          </a>
        </p>
      </div>
    </footer>
  )
}

