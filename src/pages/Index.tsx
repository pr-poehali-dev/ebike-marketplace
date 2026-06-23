import { useState, useMemo } from 'react';
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

const sidebarGroups = [
  {
    title: 'Каталог',
    items: [
      { id: 'feed', label: 'Объявления', icon: 'LayoutGrid' },
      { id: 'shop', label: 'Магазин', icon: 'ShoppingBag' },
      { id: 'parts', label: 'Запчасти', icon: 'Wrench' },
    ],
  },
  {
    title: 'Услуги',
    items: [
      { id: 'rent', label: 'Аренда', icon: 'Bike' },
      { id: 'service', label: 'Запись на СТО', icon: 'UserCog' },
    ],
  },
  {
    title: 'Аккаунт',
    items: [
      { id: 'pricing', label: 'Подписки', icon: 'Crown' },
      { id: 'about', label: 'О Xabar', icon: 'Info' },
    ],
  },
];

const listings = [
  { name: 'Xabar Volt X1', price: '189 000 ₽', spec: '120 км · 45 км/ч', cat: 'Велосипеды', city: 'Москва', icon: 'Zap', tag: 'Новый' },
  { name: 'Xabar Urban S', price: '142 000 ₽', spec: '90 км · 35 км/ч', cat: 'Велосипеды', city: 'Казань', icon: 'Bike', tag: 'Город' },
  { name: 'Xabar Trail Pro', price: '256 000 ₽', spec: '150 км · 50 км/ч', cat: 'Велосипеды', city: 'Сочи', icon: 'Mountain', tag: 'Off-road' },
  { name: 'Аккумулятор 48V 20Ah', price: '34 900 ₽', spec: 'Li-ion · 1000 циклов', cat: 'Запчасти', city: 'Москва', icon: 'BatteryCharging', tag: 'Хит' },
  { name: 'Мотор-колесо 1000W', price: '21 500 ₽', spec: 'Задний привод', cat: 'Запчасти', city: 'СПб', icon: 'Disc3', tag: 'В наличии' },
  { name: 'Дисплей LCD Smart', price: '6 400 ₽', spec: 'Bluetooth · IP65', cat: 'Запчасти', city: 'Казань', icon: 'MonitorSmartphone', tag: 'Скидка' },
  { name: 'Аренда Urban на сутки', price: '1 490 ₽', spec: 'Залог 5 000 ₽', cat: 'Аренда', city: 'Москва', icon: 'Sun', tag: 'Доступно' },
  { name: 'Гидравлические тормоза', price: '8 900 ₽', spec: 'Комплект 2 шт.', cat: 'Запчасти', city: 'Сочи', icon: 'CircleStop', tag: 'В наличии' },
];

const categories = ['Все', 'Велосипеды', 'Запчасти', 'Аренда'];

const bikes = listings.filter((l) => l.cat === 'Велосипеды');
const parts = listings.filter((l) => l.cat === 'Запчасти');

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
  const [mobileNav, setMobileNav] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Все');
  const [active, setActive] = useState('feed');

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const byCat = category === 'Все' || l.cat === category;
      const byQuery =
        !query ||
        l.name.toLowerCase().includes(query.toLowerCase()) ||
        l.city.toLowerCase().includes(query.toLowerCase());
      return byCat && byQuery;
    });
  }, [query, category]);

  const scrollTo = (id: string) => {
    setActive(id);
    setMobileNav(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 px-2 mb-8">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center glow">
          <Icon name="Zap" className="text-primary-foreground" size={20} />
        </div>
        <span className="font-display text-2xl font-bold tracking-wide">XABAR</span>
      </button>

      <nav className="flex-1 space-y-6 overflow-y-auto">
        {sidebarGroups.map((g) => (
          <div key={g.title}>
            <div className="px-3 mb-2 text-[11px] uppercase tracking-wider text-muted-foreground/70">{g.title}</div>
            <div className="space-y-1">
              {g.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    active === item.id
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="pt-4 border-t border-border mt-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full border-primary/40 gap-2 justify-start">
                <Icon name="User" size={16} className="text-primary" />
                <span className="truncate">{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
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
              setMobileNav(false);
            }}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium gap-2"
          >
            <Icon name="LogIn" size={16} /> Войти
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-primary-foreground">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 border-r border-border bg-card/40 backdrop-blur-xl p-5 z-40">
        <SidebarContent />
      </aside>

      {/* MOBILE DRAWER */}
      {mobileNav && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/70 z-40 animate-fade-in" onClick={() => setMobileNav(false)} />
          <aside className="lg:hidden fixed inset-y-0 left-0 w-72 border-r border-border bg-card p-5 z-50 animate-fade-in">
            <SidebarContent />
          </aside>
        </>
      )}

      <div className="lg:pl-64">
        {/* TOP BAR with SEARCH */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 md:px-8 h-16">
            <button onClick={() => setMobileNav(true)} className="lg:hidden text-foreground">
              <Icon name="Menu" size={24} />
            </button>
            <div className="relative flex-1 max-w-2xl">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск велосипедов, запчастей, аренды..."
                className="pl-10 bg-secondary border-border focus-visible:ring-primary"
              />
            </div>
            <Button
              onClick={() => requireAuth('Объявление отправлено на модерацию')}
              className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <Icon name="Plus" size={18} /> Разместить
            </Button>
          </div>
        </header>

        <main className="px-4 md:px-8 pb-20">
          {/* HERO */}
          <section id="hero" className="relative py-10 overflow-hidden grid-bg rounded-2xl mt-6 px-6 md:px-10 border border-border scroll-mt-20">
            <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div className="animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 text-primary text-xs mb-5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Платформа электротранспорта №1
                </div>
                <h1 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-4">
                  ЭЛЕКТРОВЕЛОСИПЕДЫ <span className="text-primary glow-text">БЕЗ ГРАНИЦ</span>
                </h1>
                <p className="text-base text-muted-foreground mb-6 max-w-md">
                  Покупай, бери в аренду, заказывай запчасти и записывайся на сервис — всё в одном месте.
                </p>
                <div className="flex gap-6">
                  {[
                    ['12K+', 'Объявлений'],
                    ['340', 'Мастеров'],
                    ['98%', 'Довольных'],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <div className="font-display text-2xl font-bold text-primary">{n}</div>
                      <div className="text-xs text-muted-foreground">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative animate-fade-in hidden md:block" style={{ animationDelay: '0.15s' }}>
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <img src={HERO_IMG} alt="Электровелосипед Xabar" className="relative rounded-2xl border border-border w-full" />
              </div>
            </div>
          </section>

          {/* FEED — listings */}
          <section id="feed" className="pt-12 scroll-mt-20">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="font-display text-3xl font-bold flex items-center gap-2">
                <Icon name="LayoutGrid" className="text-primary" size={26} /> Доступные объявления
              </h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                      category === c
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Icon name="SearchX" size={40} className="mx-auto mb-3 text-primary/50" />
                Ничего не найдено по запросу «{query}»
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((l) => (
                  <div key={l.name} className="group rounded-2xl border border-border bg-card p-5 hover-scale hover:border-primary/50">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon name={l.icon} className="text-primary" size={22} />
                      </div>
                      <span className="text-[11px] px-2 py-1 rounded-full bg-primary/15 text-primary">{l.tag}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-1 leading-tight">{l.name}</h3>
                    <p className="text-xs text-muted-foreground mb-1">{l.spec}</p>
                    <p className="text-xs text-muted-foreground/70 flex items-center gap-1 mb-4">
                      <Icon name="MapPin" size={12} /> {l.city}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl font-bold text-primary">{l.price}</span>
                      <Button size="sm" onClick={() => requireAuth(`${l.name} — отклик отправлен`)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Открыть
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SHOP */}
          <section id="shop" className="pt-16 scroll-mt-20">
            <SectionTitle icon="ShoppingBag" kicker="Магазин" title="Велосипеды" />
            <div className="grid md:grid-cols-3 gap-5">
              {bikes.map((b) => (
                <div key={b.name} className="rounded-2xl border border-border bg-card p-6 hover-scale hover:border-primary/50">
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
          </section>

          {/* PARTS */}
          <section id="parts" className="pt-16 scroll-mt-20">
            <SectionTitle icon="Wrench" kicker="Запчасти" title="Комплектующие" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {parts.map((p) => (
                <div key={p.name} className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors">
                  <Icon name={p.icon} className="text-primary mb-4" size={26} />
                  <h4 className="font-medium mb-1 text-sm">{p.name}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{p.spec}</p>
                  <div className="flex items-center justify-between">
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
          </section>

          {/* RENT */}
          <section id="rent" className="pt-16 scroll-mt-20">
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
          </section>

          {/* SERVICE */}
          <section id="service" className="pt-16 scroll-mt-20">
            <SectionTitle icon="UserCog" kicker="Сервис" title="Запись на СТО к мастерам" />
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
          </section>

          {/* PRICING */}
          <section id="pricing" className="pt-16 scroll-mt-20">
            <SectionTitle icon="Crown" kicker="Подписки" title="Выбери свой тариф" />
            <div className="grid md:grid-cols-3 gap-5 max-w-5xl">
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
          </section>

          {/* ABOUT */}
          <section id="about" className="pt-16 scroll-mt-20">
            <SectionTitle icon="Info" kicker="О Xabar" title="Как это работает" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
          </section>
        </main>
      </div>

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
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 text-primary text-sm mb-2">
        <Icon name={icon} size={16} /> {kicker}
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-bold">{title}</h2>
    </div>
  );
}

export default Index;
