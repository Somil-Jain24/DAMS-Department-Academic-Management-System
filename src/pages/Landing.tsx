import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, Shield, BookOpen, Award, BarChart3, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: GraduationCap,
      title: "Student Portal",
      description: "Track attendance, view marks, submit assignments, and manage your academic journey.",
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      icon: Users,
      title: "Faculty Dashboard",
      description: "Manage classes, mark attendance, create assignments, and track student progress.",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: Shield,
      title: "Admin Control",
      description: "Complete system oversight with user management, analytics, and academic records.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  const stats = [
    { value: "9", label: "Classes" },
    { value: "500+", label: "Students" },
    { value: "50+", label: "Faculty" },
    { value: "99.9%", label: "Uptime" },
  ];

  const roles = [
    {
      title: "Student",
      description: "Access your academic dashboard",
      icon: GraduationCap,
      path: "/student",
      gradient: "from-info/20 to-info/5",
    },
    {
      title: "Faculty",
      description: "Manage your classes & students",
      icon: BookOpen,
      path: "/faculty",
      gradient: "from-success/20 to-success/5",
    },
    {
      title: "Admin",
      description: "System administration & oversight",
      icon: Shield,
      path: "/admin",
      gradient: "from-accent/20 to-accent/5",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, currentColor 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="container relative z-10 py-20 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-accent" />
                <span>Acropolis Institute of Technology & Research</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Department Academic{" "}
              <span className="text-gradient">Management System</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 text-lg text-primary-foreground/80 sm:text-xl"
            >
              Streamline academic operations for IT & DS departments. 
              Track attendance, manage assignments, monitor performance, and more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button variant="hero" size="xl" onClick={() => navigate("/login")}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="hero-outline" size="xl">
                Learn More
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-accent sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive platform designed for students, faculty, and administrators.
            </p>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="interactive" className="h-full">
                  <CardHeader>
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor}`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="bg-muted/50 py-20 lg:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Select Your Role
            </h2>
            <p className="text-lg text-muted-foreground">
              Access the dashboard designed for your specific needs.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {roles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  variant="interactive"
                  className={`group cursor-pointer bg-gradient-to-br ${role.gradient} border-0`}
                  onClick={() => navigate(role.path)}
                >
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <div className="mb-4 rounded-2xl bg-card p-4 shadow-md transition-transform duration-300 group-hover:scale-110">
                      <role.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                    <Button variant="ghost" className="mt-4 group-hover:text-accent">
                      Access Dashboard
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="gradient" className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 25px 25px, currentColor 2px, transparent 0)`,
                  backgroundSize: '50px 50px'
                }} />
              </div>
              <CardContent className="relative z-10 flex flex-col items-center p-12 text-center lg:p-16">
                <Award className="mb-6 h-16 w-16 text-accent" />
                <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                  Ready to Transform Your Academic Management?
                </h2>
                <p className="mb-8 max-w-2xl text-lg text-primary-foreground/80">
                  Join the digital revolution in education. DAMS provides all the tools you need
                  to streamline academic operations and enhance student success.
                </p>
                <Button variant="hero" size="xl" onClick={() => navigate("/login")}>
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold">DAMS</p>
                <p className="text-sm text-muted-foreground">Acropolis IT Department</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Department Academic Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
