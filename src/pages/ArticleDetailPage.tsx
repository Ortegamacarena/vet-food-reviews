import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { RatingStars } from "@/components/shared/RatingStars";
import { PetTypeBadge } from "@/components/shared/PetTypeBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, CheckCircle2, XCircle, Award, Utensils, TrendingUp, Wallet } from "lucide-react";
import articlesData from "@/data/articles.json";
import brandsData from "@/data/brands.json";
import { motion } from "framer-motion";

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const article = articlesData.find(a => a.slug === slug);

  if (!article) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Artículo no encontrado</h1>
          <Button asChild>
            <Link to="/articulos">Volver a reviews</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const brand = brandsData.find(b => b.id === article.brandId);

  const scoreItems = [
    { key: "ingredients", label: "Ingredientes", icon: Utensils },
    { key: "nutrition", label: "Nutrición", icon: TrendingUp },
    { key: "palatability", label: "Palatabilidad", icon: Award },
    { key: "priceQuality", label: "Calidad/Precio", icon: Wallet },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-8">
        <div className="container">
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/articulos">
              <ArrowLeft className="h-4 w-4" />
              Volver a reviews
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <PetTypeBadge type={article.petType as any} />
                <span className="text-sm text-muted-foreground">{article.category}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                {article.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.publishDate).toLocaleDateString('es-ES', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime} min de lectura
                </span>
              </div>
            </div>

            {/* Score Card */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
              <div className="text-center mb-6">
                <span className="text-6xl block mb-2">{article.image}</span>
                <RatingStars rating={article.rating} size="lg" />
                <p className="text-sm text-muted-foreground mt-2">Puntuación general</p>
              </div>
              
              {brand && (
                <Link 
                  to={`/marca/${brand.id}`}
                  className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl mb-4 hover:bg-secondary transition-colors"
                >
                  <span className="text-2xl">{brand.logo}</span>
                  <div>
                    <p className="font-medium text-sm">{brand.name}</p>
                    <p className="text-xs text-muted-foreground">{brand.priceRange}</p>
                  </div>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Pros & Cons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div className="bg-rating-excellent/10 rounded-2xl p-6">
                  <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2 text-rating-excellent">
                    <CheckCircle2 className="h-5 w-5" />
                    Pros
                  </h3>
                  <ul className="space-y-3">
                    {article.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-rating-excellent shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-destructive/10 rounded-2xl p-6">
                  <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2 text-destructive">
                    <XCircle className="h-5 w-5" />
                    Contras
                  </h3>
                  <ul className="space-y-3">
                    {article.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Ingredients */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h3 className="font-heading font-semibold text-xl mb-6">
                  Análisis Nutricional
                </h3>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-secondary/50 rounded-xl">
                    <p className="text-2xl font-bold text-primary">{article.ingredients.protein}%</p>
                    <p className="text-sm text-muted-foreground">Proteína</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-xl">
                    <p className="text-2xl font-bold text-accent">{article.ingredients.fat}%</p>
                    <p className="text-sm text-muted-foreground">Grasa</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-xl">
                    <p className="text-2xl font-bold text-muted-foreground">{article.ingredients.fiber}%</p>
                    <p className="text-sm text-muted-foreground">Fibra</p>
                  </div>
                </div>

                <h4 className="font-medium mb-3">Ingredientes principales:</h4>
                <div className="flex flex-wrap gap-2">
                  {article.ingredients.mainIngredients.map((ingredient, i) => (
                    <span 
                      key={i}
                      className="bg-secondary px-3 py-1 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Verdict */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20"
              >
                <h3 className="font-heading font-semibold text-xl mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Veredicto Final
                </h3>
                <p className="text-foreground leading-relaxed">
                  {article.verdict}
                </p>
              </motion.div>
            </div>

            {/* Sidebar Scores */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-heading font-semibold text-lg mb-6">
                  Puntuaciones Detalladas
                </h3>
                
                <div className="space-y-4">
                  {scoreItems.map((item) => {
                    const score = article.scores[item.key as keyof typeof article.scores];
                    return (
                      <div key={item.key}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="flex items-center gap-2 text-sm">
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                            {item.label}
                          </span>
                          <span className="font-semibold">{score}/5</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                            style={{ width: `${(score / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ArticleDetailPage;
