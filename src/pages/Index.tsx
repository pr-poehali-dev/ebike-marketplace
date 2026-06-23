import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/1db33f65-3a09-46e2-95aa-440360b3bcac/files/5e166389-437a-4d48-9841-153fa6873918.jpg';

type User = { name: string; email: string };

const nav = [
  { id: 'shop', label: 'Магазин' },
  { id: 'rent', label: 'Аренда' },
  { id: 'service', label: 'СТО' },
  { id: 'pricing', label: 'Подписки' },
  { id: 'about', label: 'О Xabar' },
];

const bikes = [
  { name: 'Xabar Volt X1', price: '189 000 ₽', spec: '120 км · 45 км/ч', tag: 'Хит', icon: 'Zap' },
  { name: 'Xabar Urban S', price: '142 000 ₽', spec: '90 км · 35 км/ч', tag: 'Город', icon: 'Bike' },
  { name: 'Xabar Trail Pro', price: '256 000 ₽', spec: '150 км · 50 км/ч', tag: 'Off-road', icon: 'Mountain' },
];

const parts = [
  { name: 'Аккумулятор 48V 20Ah', price: '34 900 ₽', icon: 'BatteryCharging' },
  { name: 'Мотор-колесо 1000W', price: '21 500 ₽', icon: 'Disc3' },
  { name: 'Дисплей LCD Smart', price: '6 400 ₽', icon: 'MonitorSmartphone' },
  { name: 'Гидравлические тормоза', price: '8 900 ₽', icon: 'CircleStop' },
];

const rentals = [
  { name: 'Час', price: '290 ₽', desc: 'Прокатиться по городу', icon: 'Timer' },
  { name: 'Сутки', price: '1 490 ₽', desc: 'На целый день приключений', icon: 'Sun' },
  { name: 'Месяц', price: '14 900 ₽', desc: 'Замена личному транспорту', icon: 'CalendarRange' },
];

const masters = [
  { name: 'Артём Сафин', role: 'Мастер по электронике', rating: '4.9', slots: ['10:00', '13:30', '16:00'] },
  { name: 'Дмитрий Орлов', role: 'Механик-универсал', rating: '5.0', slots: ['11:00', '14:00', '18:00'] },
  { name: 'Сервис Xabar Центр', role: 'Полный цикл ТО', rating: '4.8', slots: ['09:00', '12:00', '15:30'] },
];

const plans = [
  {
    name: 'Старт',
    price: '0 ₽',
    period: 'навсегда',
    features: ['Доступ к магазину', 'Аренда по базовым ценам', 'Запись на СТО', 'Поддержка по email'],
    cta: 'Текущий план',
    highlight: false,
  },
  {
    name: 'Драйв',
    price: '690 ₽',
    period: 'в месяц',
    features: ['Скидка 10% на запчасти', 'Аренда −15%', 'Приоритетная запись на СТО', 'Бесплатная диагностика 1 раз/мес'],
    cta: 'Подключить Драйв',
    highlight: true,
  },
  {
    name: 'Про',
    price: '1 990 ₽',
    period: 'в месяц',
    features: ['Скидка 25% на всё', 'Аренда −40%', 'Личный мастер 24/7', 'Бесплатное ТО ежемесячно', 'Страховка велосипеда'],
    cta: 'Подключить Про',
    highlight: false,
  },
];

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password || (authMode === 'register' && !form.name)) {
      toast.error('Заполните все поля');
      return;
    }
    const name = authMode === 'register' ? form.name : form.email.split('@')[0];
    const newUser = { name, email: form.email };
    setUser(newUser);
    localStorage.setItem('xabar_user', JSON.stringify(newUser));
    setAuthOpen(false);
    setForm({ name: '', email: '', password: '' });
    toast.success(authMode === 'login' ? 'С возвращением!' : 'Аккаунт создан');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('xabar_user');
    toast('Вы вышли из аккаунта');
  };

  const requireAuth = (action: string) => {
    if (!user) {
      setAuthMode('login');
      setAuthOpen(true);
      return;
    }
    toast.success(action);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-primary-foreground">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center glow">
              <Icon name="Zap" className="text-primary-foreground" size={20} />
            </div>
            <span className="font-display text-2xl font-bold tracking-wide">XABAR</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-md"
              >
                {n.label}
              </button>
            ))}
          </nav>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-primary/40 gap-2">
                  <Icon name="User" size={16} className="text-primary" />
                  <span className="max-w-24 truncate">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="font-display text-base">{user.name}</div>
                  <div className="text-xs text-muted-foreground font-normal">{user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <Icon name="Package" size={16} /> Мои заказы
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Icon name="CalendarCheck" size={16} /> Бронирования
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Icon name="Crown" size={16} /> Подписка: Старт
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="gap-2 text-destructive focus:text-destructive">
                  <Icon name="LogOut" size={16} /> Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => {
                setAuthMode('login');
                setAuthOpen(true);
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
            >
              Войти
            </Button>
          )}
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative pt-32 pb-20 overflow-hidden grid-bg">
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 text-primary text-xs mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Платформа электротранспорта №1
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
              ЭЛЕКТРОВЕЛОСИПЕДЫ <span className="text-primary glow-text">БЕЗ ГРАНИЦ</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Покупай, бери в аренду, заказывай запчасти и записывайся на сервис — всё в одном месте.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => scrollTo('shop')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow gap-2"
              >
                <Icon name="ShoppingBag" size={18} /> В магазин
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('rent')}
                className="border-primary/40 hover:bg-primary/10 gap-2"
              >
                <Icon name="Bike" size={18} /> Арендовать
              </Button>
            </div>
            <div className="flex gap-8 mt-12">
              {[
                ['12K+', 'Велосипедов'],
                ['340', 'Мастеров'],
                ['98%', 'Довольных'],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl font-bold text-primary">{n}</div>
                  <div className="text-xs text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '0.15s' }}>
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <img src={HERO_IMG} alt="Электровелосипед Xabar" className="relative rounded-2xl border border-border w-full" />
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="py-20 border-t border-border">
        <div className="container">
          <SectionTitle icon="ShoppingBag" kicker="Магазин" title="Велосипеды и запчасти" />
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {bikes.map((b) => (
              <div key={b.name} className="group rounded-2xl border border-border bg-card p-6 hover-scale hover:border-primary/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon name={b.icon} className="text-primary" size={24} />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/15 text-primary">{b.tag}</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-1">{b.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{b.spec}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-bold text-primary">{b.price}</span>
                  <Button size="sm" onClick={() => requireAuth(`${b.name} добавлен в корзину`)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Купить
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-display text-xl font-semibold mb-5 flex items-center gap-2">
            <Icon name="Wrench" className="text-primary" size={20} /> Запчасти
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {parts.map((p) => (
              <div key={p.name} className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors">
                <Icon name={p.icon} className="text-primary mb-4" size={26} />
                <h4 className="font-medium mb-1 text-sm">{p.name}</h4>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-display font-bold text-primary">{p.price}</span>
                  <button
                    onClick={() => requireAuth(`${p.name} в корзине`)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon name="Plus" size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RENT */}
      <section id="rent" className="py-20 border-t border-border grid-bg">
        <div className="container">
          <SectionTitle icon="Bike" kicker="Аренда" title="Бери и поезжай" />
          <div className="grid md:grid-cols-3 gap-5">
            {rentals.map((r) => (
              <div key={r.name} className="rounded-2xl border border-border bg-card p-8 text-center hover-scale hover:border-primary/50">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Icon name={r.icon} className="text-primary" size={28} />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-1">{r.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{r.desc}</p>
                <div className="font-display text-3xl font-bold text-primary mb-5">{r.price}</div>
                <Button onClick={() => requireAuth(`Аренда «${r.name}» оформлена`)} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Арендовать
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE */}
      <section id="service" className="py-20 border-t border-border">
        <div className="container">
          <SectionTitle icon="Wrench" kicker="Сервис" title="Запись на СТО к мастерам" />
          <div className="grid md:grid-cols-3 gap-5">
            {masters.map((m) => (
              <div key={m.name} className="rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="UserCog" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-tight">{m.name}</h3>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-primary mb-4">
                  <Icon name="Star" size={15} className="fill-primary" /> {m.rating}
                </div>
                <p className="text-xs text-muted-foreground mb-2">Свободное время сегодня:</p>
                <div className="flex flex-wrap gap-2">
                  {m.slots.map((s) => (
                    <button
                      key={s}
                      onClick={() => requireAuth(`Вы записаны к ${m.name} на ${s}`)}
                      className="px-3 py-1.5 text-sm rounded-lg border border-border hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 border-t border-border grid-bg">
        <div className="container">
          <SectionTitle icon="Crown" kicker="Подписки" title="Выбери свой тариф" />
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl border p-8 flex flex-col ${
                  p.highlight ? 'border-primary bg-card glow' : 'border-border bg-card'
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground font-medium">
                    Популярный
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold mb-1">{p.name}</h3>
                <div className="mb-6">
                  <span className="font-display text-4xl font-bold text-primary">{p.price}</span>
                  <span className="text-sm text-muted-foreground"> / {p.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Icon name="Check" size={18} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => requireAuth(`Тариф «${p.name}» подключён`)}
                  className={
                    p.highlight
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }
                >
                  {p.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 border-t border-border">
        <div className="container">
          <SectionTitle icon="Info" kicker="О Xabar" title="Как это работает" />
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { icon: 'UserPlus', t: 'Регистрация', d: 'Создай аккаунт за минуту' },
              { icon: 'Search', t: 'Выбор', d: 'Покупка, аренда или сервис' },
              { icon: 'CreditCard', t: 'Оплата', d: 'Безопасно онлайн' },
              { icon: 'Rocket', t: 'Поехали', d: 'Получай и катайся' },
            ].map((s, i) => (
              <div key={s.t} className="rounded-2xl border border-border bg-card p-6">
                <div className="font-display text-5xl font-bold text-primary/20 mb-3">0{i + 1}</div>
                <Icon name={s.icon} className="text-primary mb-3" size={26} />
                <h3 className="font-display text-lg font-semibold mb-1">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Icon name="Zap" className="text-primary-foreground" size={16} />
            </div>
            <span className="font-display text-lg font-bold">XABAR</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Xabar — электротранспорт нового поколения</p>
          <div className="flex gap-3">
            {['Send', 'Instagram', 'Youtube'].map((s) => (
              <button key={s} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Icon name={s} size={16} />
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* AUTH DIALOG */}
      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {authMode === 'login' ? 'Вход в Xabar' : 'Регистрация'}
            </DialogTitle>
            <DialogDescription>
              {authMode === 'login' ? 'Войдите, чтобы продолжить' : 'Создайте аккаунт за минуту'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAuth} className="space-y-4">
            {authMode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" placeholder="Ваше имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@mail.ru" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <DialogFooter className="flex-col gap-2 sm:flex-col">
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                {authMode === 'login' ? 'Войти' : 'Создать аккаунт'}
              </Button>
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {authMode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function SectionTitle({ icon, kicker, title }: { icon: string; kicker: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="inline-flex items-center gap-2 text-primary text-sm mb-3">
        <Icon name={icon} size={16} /> {kicker}
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold">{title}</h2>
    </div>
  );
}

export default Index;
