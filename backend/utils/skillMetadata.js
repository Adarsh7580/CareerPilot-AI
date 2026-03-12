const DEFAULT_META = {
  priority: "Medium",
  impact: 2,
  weeks: 2,
  difficulty: "Medium",
  topics: [],
  resources: [],
  reason: "Required for this role"
};

module.exports = {
  // ---------------- CORE BACKEND ----------------
  "System Design": {
    priority: "Critical",
    impact: 5,
    weeks: 6,
    difficulty: "Hard",
    topics: [
      "Scalability basics",
      "Load balancing",
      "Caching strategies",
      "Database sharding",
      "CAP theorem",
      "System design interviews"
    ],
    resources: [
      {
        title: "System Design Primer",
        link: "https://github.com/donnemartin/system-design-primer"
      },
      {
        title: "Gaurav Sen – System Design",
        link: "https://www.youtube.com/c/GauravSensei"
      }
    ],
    reason: "Core backend architecture skill"
  },

  "Network Security": {
    priority: "High",
    impact: 4,
    weeks: 3,
    difficulty: "Medium",
    topics: [
      "Firewalls",
      "IDS/IPS",
      "TCP/IP basics",
      "Threat models"
    ],
    resources: [
      {
        title: "OWASP Network Security",
        link: "https://owasp.org"
      }
    ],
    reason: "Essential for security roles"
  },

  "Python": {
    priority: "High",
    impact: 4,
    weeks: 3,
    difficulty: "Medium",
    topics: [
      "Syntax & data types",
      "OOP",
      "Virtual environments",
      "Scripting"
    ],
    resources: [
      {
        title: "Python Docs",
        link: "https://docs.python.org/3/"
      }
    ],
    reason: "Core language skill"
  },

  "SIEM": {
    priority: "Medium",
    impact: 3,
    weeks: 2,
    difficulty: "Medium",
    topics: [
      "Log aggregation",
      "Alerting",
      "Threat detection",
      "Incident response"
    ],
    resources: [
      {
        title: "SIEM Basics",
        link: "https://www.ibm.com/topics/siem"
      }
    ],
    reason: "Monitoring & threat analysis"
  },

  "Ethical Hacking": {
    priority: "Medium",
    impact: 3,
    weeks: 3,
    difficulty: "Medium",
    topics: [
      "Reconnaissance",
      "Vulnerabilities",
      "Penetration testing",
      "OWASP Top 10"
    ],
    resources: [
      {
        title: "OWASP Top 10",
        link: "https://owasp.org/www-project-top-ten/"
      }
    ],
    reason: "Offensive security foundation"
  },

  "Node.js": {
  priority: "High",
  impact: 4,
  weeks: 3,
  difficulty: "Medium",
  topics: [
    "Node.js architecture",
    "Event loop",
    "Express.js basics",
    "Building REST APIs"
  ],
  resources: [
    {
      title: "Node.js Full Course",
      link: "https://www.youtube.com/watch?v=Oe421EPjeBE"
    },
    {
      title: "Node.js Documentation",
      link: "https://nodejs.org/en/docs/"
    }
  ],
  reason: "Essential backend runtime"
},

"MongoDB": {
  priority: "High",
  impact: 3,
  weeks: 2,
  difficulty: "Medium",
  topics: [
    "MongoDB CRUD operations",
    "Indexes",
    "Aggregation pipeline",
    "Schema design"
  ],
  resources: [
    {
      title: "MongoDB Crash Course",
      link: "https://www.youtube.com/watch?v=ofme2o29ngU"
    },
    {
      title: "MongoDB Docs",
      link: "https://www.mongodb.com/docs/"
    }
  ],
  reason: "Popular NoSQL database"
},

"PostgreSQL": {
  priority: "High",
  impact: 3,
  weeks: 2,
  difficulty: "Medium",
  topics: [
    "Relational database basics",
    "Joins and transactions",
    "Indexes",
    "Query optimization"
  ],
  resources: [
    {
      title: "PostgreSQL Full Course",
      link: "https://www.youtube.com/watch?v=qw--VYLpxG4"
    },
    {
      title: "PostgreSQL Docs",
      link: "https://www.postgresql.org/docs/"
    }
  ],
  reason: "Widely used relational database"
},

"Redis": {
  priority: "Medium",
  impact: 3,
  weeks: 2,
  difficulty: "Medium",
  topics: [
    "Caching basics",
    "Redis data structures",
    "Pub/Sub",
    "Session storage"
  ],
  resources: [
    {
      title: "Redis Crash Course",
      link: "https://www.youtube.com/watch?v=Hbt56gFj998"
    }
  ],
  reason: "Used for caching and performance"
},

"React": {
  priority: "High",
  impact: 4,
  weeks: 3,
  difficulty: "Medium",
  topics: [
    "Components",
    "Hooks",
    "State management",
    "API integration"
  ],
  resources: [
    {
      title: "React Full Course",
      link: "https://www.youtube.com/watch?v=bMknfKXIFA8"
    }
  ],
  reason: "Most popular frontend library"
},

"Express": {
  priority: "High",
  impact: 3,
  weeks: 2,
  difficulty: "Easy",
  topics: [
    "Express routing",
    "Middleware",
    "REST API creation",
    "Error handling"
  ],
  resources: [
    {
      title: "Express.js Tutorial",
      link: "https://www.youtube.com/watch?v=L72fhGm1tfE"
    }
  ],
  reason: "Node.js backend framework"
},

"AWS": {
  priority: "High",
  impact: 4,
  weeks: 3,
  difficulty: "Medium",
  topics: [
    "EC2 basics",
    "S3 storage",
    "IAM",
    "Deploying applications"
  ],
  resources: [
    {
      title: "AWS Full Course",
      link: "https://www.youtube.com/watch?v=Ia-UEYYR44s"
    }
  ],
  reason: "Industry standard cloud platform"
},

"Docker": {
  priority: "Medium",
  impact: 3,
  weeks: 2,
  difficulty: "Medium",
  topics: [
    "Docker containers",
    "Dockerfiles",
    "Image management",
    "Deployment basics"
  ],
  resources: [
    {
      title: "Docker Crash Course",
      link: "https://www.youtube.com/watch?v=fqMOX6JJhGo"
    }
  ],
  reason: "Containerization for deployment"
},



  // fallback access (used in controller)
  __DEFAULT__: DEFAULT_META
};
