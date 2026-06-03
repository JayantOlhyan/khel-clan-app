import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  Dimensions, 
  Platform, 
  Modal, 
  ImageBackground,
  StyleSheet,
  Text
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Search, 
  Bell, 
  Star, 
  MapPin, 
  Calendar as CalendarIcon, 
  Bookmark, 
  ArrowRight, 
  Clock, 
  User, 
  Check,
  ChevronLeft,
  Sparkles,
  SlidersHorizontal,
  Compass
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// PREMIUM MOBILE APP DESIGN SYSTEM
const THEME = {
  bgLight: '#F4F6F2',
  bgDark: '#0A0A0A',
  primaryLime: '#CAFC05',
  primaryLimeDark: '#AECB04',
  textDark: '#0D110E',
  textGray: '#6C746E',
  textLight: '#FFFFFF',
  borderLight: '#E5E8E2',
  cardBg: '#FFFFFF',
  shadowColor: '#1A2E1A',
  fontFamily: Platform.OS === 'web' 
    ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    : 'System',
};

interface Court {
  id: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  location: string;
  isIndoor: boolean;
  isOutdoor: boolean;
  isAvailable: boolean;
  isSingle: boolean;
  image: any;
}

const COURTS: Court[] = [
  {
    id: 'c1',
    name: 'Sunset Courts',
    price: 30,
    rating: 4.7,
    description: 'Play at the top-rated pickleball club, featuring premium surfaces and luxury amenities.',
    location: 'Brooklyn, NY',
    isIndoor: false,
    isOutdoor: true,
    isAvailable: true,
    isSingle: false,
    image: require('../../assets/images/court_sunset.png')
  },
  {
    id: 'c2',
    name: 'Azure Courts',
    price: 35,
    rating: 4.3,
    description: 'Smash your way to victory at our vibrant, professionally lit indoor court club.',
    location: 'Manhattan, NY',
    isIndoor: true,
    isOutdoor: false,
    isAvailable: true,
    isSingle: true,
    image: require('../../assets/images/court_azure.png')
  },
  {
    id: 'c3',
    name: 'Central Courts',
    price: 25,
    rating: 4.5,
    description: 'Experience the thrill of pickleball at our highly social community turf.',
    location: 'Queens, NY',
    isIndoor: false,
    isOutdoor: true,
    isAvailable: false,
    isSingle: true,
    image: require('../../assets/images/pickleball_paddle_card.png')
  },
  {
    id: 'c4',
    name: 'Skyline Courts',
    price: 40,
    rating: 4.5,
    description: 'Elevate your game at our premium rooftop courts overlooking the city skyline.',
    location: 'Hoboken, NJ',
    isIndoor: true,
    isOutdoor: true,
    isAvailable: true,
    isSingle: false,
    image: require('../../assets/images/pickleball_welcome.png')
  }
];

export default function PickleballExploreTab() {
  const router = useRouter();
  const params = useLocalSearchParams();
  // NATIVE APP SCREEN SUB-NAVIGATION STATE: 'explore' | 'find_court'
  const [currentScreen, setCurrentScreen] = useState<'explore' | 'find_court'>('explore');

  // Search & dynamic filtering states for the Find a Court screen
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (params.search && params.search !== '') {
      setSearchQuery(params.search as string);
      setCurrentScreen('find_court');
      // Clear the query parameter so the user can navigate back
      router.setParams({ search: '' });
    } else if (params.category && params.category === 'Courts') {
      setCurrentScreen('find_court');
      // Clear the query parameter
      router.setParams({ category: '' });
    }
  }, [params]);
  const [filterAvailable, setFilterAvailable] = useState(true); // Default active filter
  const [filterIndoor, setFilterIndoor] = useState(false);
  const [filterOutdoor, setFilterOutdoor] = useState(false);
  const [filterSingle, setFilterSingle] = useState(false);

  // Booking checkout modal states
  const [bookingCourt, setBookingCourt] = useState<Court | null>(null);
  const [selectedDate, setSelectedDate] = useState('Today, May 30');
  const [selectedTime, setSelectedTime] = useState('05:00 PM - 06:00 PM');
  const [isBooked, setIsBooked] = useState(false);

  // Filter courts logically
  const filteredCourts = COURTS.filter(court => {
    const matchesSearch = court.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          court.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAvailable = !filterAvailable || court.isAvailable;
    const matchesIndoor = !filterIndoor || court.isIndoor;
    const matchesOutdoor = !filterOutdoor || court.isOutdoor;
    const matchesSingle = !filterSingle || court.isSingle;
    return matchesSearch && matchesAvailable && matchesIndoor && matchesOutdoor && matchesSingle;
  });

  const handleBookPress = (court: Court) => {
    setBookingCourt(court);
    setIsBooked(false);
  };

  const handleConfirmBooking = () => {
    setIsBooked(true);
    setTimeout(() => {
      setBookingCourt(null);
      setIsBooked(false);
    }, 1800);
  };

  // ============================================
  // SCREEN 1: EXPLORE HOME DASHBOARD
  // ============================================
  const renderExploreScreen = () => {
    return (
      <View style={styles.screenContainer}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          {/* Header */}
          <View style={styles.exploreHeader}>
            <View>
              <Text style={styles.exploreHeaderSub}>Hi, Jack 👋</Text>
              <Text style={styles.exploreHeaderMain}>Explore the</Text>
              <Text style={styles.exploreHeaderBrand}>Pickleball</Text>
            </View>
            <TouchableOpacity style={styles.notificationBtn}>
              <Bell color={THEME.textDark} size={18} strokeWidth={2.5} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          {/* Sport Selection Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {['All', 'Courts', 'Camps', 'Events'].map((chip, idx) => {
              const isActive = chip === 'All';
              return (
                <TouchableOpacity 
                  key={chip}
                  activeOpacity={0.8}
                  onPress={() => {
                    if (chip === 'Courts') setCurrentScreen('find_court');
                  }}
                  style={[
                    styles.chip,
                    isActive ? { backgroundColor: THEME.primaryLime, borderColor: THEME.primaryLime } : null
                  ]}
                >
                  <Text style={[
                    styles.chipText,
                    isActive ? { color: '#000000', fontWeight: '900' } : null
                  ]}>
                    {chip}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Spotlight Featured Card */}
          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={() => setCurrentScreen('find_court')}
              style={styles.featuredCard}
            >
              <ImageBackground 
                source={require('../../assets/images/pickleball_paddle_card.png')}
                style={styles.absoluteFill}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={['rgba(11,47,42,0.1)', 'rgba(11,47,42,0.4)', 'rgba(11,47,42,0.95)']}
                  style={styles.absoluteFill}
                />
                
                <View style={styles.featuredCardContent}>
                  {/* Top indicators */}
                  <View style={styles.flexRowBetween}>
                    <View style={styles.featuredTag}>
                      <Text style={styles.featuredTagText}>Popular Courts</Text>
                    </View>
                    <View style={styles.ratingBadgePill}>
                      <Star color={THEME.primaryLime} size={10} fill={THEME.primaryLime} />
                      <Text style={styles.ratingBadgePillText}>4.5</Text>
                    </View>
                  </View>

                  {/* Info Column */}
                  <View style={{ marginTop: 'auto' }}>
                    <Text style={styles.featuredCardSub}>Explore the</Text>
                    <Text style={styles.featuredCardTitle}>Popular Courts</Text>
                    <Text style={styles.featuredCardDesc}>
                      Join our premier pickleball club for unforgettable games, expert coaching, and vibrant matchplays.
                    </Text>

                    {/* Location Badge */}
                    <View style={styles.locationPill}>
                      <MapPin color={THEME.primaryLime} size={11} strokeWidth={2.5} />
                      <Text style={styles.locationPillText}>New York, US</Text>
                    </View>

                    {/* CTA row */}
                    <View style={[styles.flexRowBetween, { marginTop: 18, alignItems: 'center' }]}>
                      <TouchableOpacity 
                        activeOpacity={0.85}
                        onPress={() => setCurrentScreen('find_court')}
                        style={styles.featuredBookBtn}
                      >
                        <Text style={styles.featuredBookBtnText}>Book Now</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.bookmarkBtn}>
                        <Bookmark color="#FFFFFF" size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          {/* Upcoming Matches widget */}
          <View style={{ marginTop: 26, paddingHorizontal: 20 }}>
            <View style={[styles.flexRowBetween, { marginBottom: 12, alignItems: 'center' }]}>
              <Text style={styles.upcomingHeaderTitle}>⚡ Upcoming Match</Text>
              <View style={styles.upcomingBadge}>
                <Text style={styles.upcomingBadgeText}>Match</Text>
              </View>
            </View>

            <View style={styles.scheduleCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.scheduleIconWrapper}>
                  <Compass color={THEME.primaryLime} size={20} />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.scheduleCardHeading}>12 Courts Available</Text>
                  <Text style={styles.scheduleCardSub}>Find match plays near you</Text>
                </View>
              </View>

              <View style={styles.calendarMiniCard}>
                <Text style={styles.calendarMiniMonth}>MAR</Text>
                <Text style={styles.calendarMiniDay}>15</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  // ============================================
  // SCREEN 2: FIND A COURT SEARCH SCREEN
  // ============================================
  const renderSearchScreen = () => {
    return (
      <View style={styles.screenContainer}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Header */}
          <View style={styles.searchHeader}>
            <TouchableOpacity onPress={() => setCurrentScreen('explore')} style={styles.circleBackBtn}>
              <ChevronLeft color="#000000" size={16} strokeWidth={3} />
            </TouchableOpacity>
            <Text style={styles.searchHeaderTitle}>Find a Court</Text>
          </View>

          {/* Interactive Search Field */}
          <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
            <View style={styles.searchBarWrapper}>
              <Search color={THEME.textGray} size={16} strokeWidth={2.5} />
              <TextInput 
                placeholder="Search courts, clubs..."
                placeholderTextColor={THEME.textGray}
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
              />
              <TouchableOpacity style={{ padding: 4 }}>
                <SlidersHorizontal color={THEME.textDark} size={15} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Horizontal Filter Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 15 }} contentContainerStyle={{ paddingHorizontal: 20 }}>
            {/* Available Now */}
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => setFilterAvailable(!filterAvailable)}
              style={[styles.filterPill, filterAvailable ? styles.filterPillActive : null]}
            >
              <Text style={[styles.filterPillText, filterAvailable ? styles.filterPillTextActive : null]}>Available Now</Text>
            </TouchableOpacity>

            {/* Indoor */}
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => setFilterIndoor(!filterIndoor)}
              style={[styles.filterPill, filterIndoor ? styles.filterPillActive : null]}
            >
              <Text style={[styles.filterPillText, filterIndoor ? styles.filterPillTextActive : null]}>Indoor</Text>
            </TouchableOpacity>

            {/* Outdoor */}
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => setFilterOutdoor(!filterOutdoor)}
              style={[styles.filterPill, filterOutdoor ? styles.filterPillActive : null]}
            >
              <Text style={[styles.filterPillText, filterOutdoor ? styles.filterPillTextActive : null]}>Outdoor</Text>
            </TouchableOpacity>

            {/* Single / Dual */}
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => setFilterSingle(!filterSingle)}
              style={[styles.filterPill, filterSingle ? styles.filterPillActive : null]}
            >
              <Text style={[styles.filterPillText, filterSingle ? styles.filterPillTextActive : null]}>Single / Dual</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Court Cards List */}
          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            {filteredCourts.length === 0 ? (
              <View style={styles.noResultsBox}>
                <Text style={styles.noResultsText}>No courts found matching selected filters.</Text>
                <TouchableOpacity 
                  onPress={() => {
                    setSearchQuery('');
                    setFilterAvailable(false);
                    setFilterIndoor(false);
                    setFilterOutdoor(false);
                    setFilterSingle(false);
                  }}
                  style={styles.noResultsResetBtn}
                >
                  <Text style={styles.noResultsResetBtnText}>Reset Filters</Text>
                </TouchableOpacity>
              </View>
            ) : (
              filteredCourts.map(court => (
                <View key={court.id} style={styles.courtItemCard}>
                  <Image source={court.image} style={styles.courtItemImg} />
                  
                  <View style={{ flex: 1, marginLeft: 14 }}>
                    {/* Title and price */}
                    <View style={styles.flexRowBetween}>
                      <Text style={styles.courtItemName}>{court.name}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={styles.courtItemPrice}>${court.price}</Text>
                        <Text style={styles.courtItemPriceHr}>/hr</Text>
                      </View>
                    </View>

                    {/* Short Description */}
                    <Text style={styles.courtItemDesc} numberOfLines={2}>
                      {court.description}
                    </Text>

                    {/* Rating and Booking button */}
                    <View style={[styles.flexRowBetween, { marginTop: 14, alignItems: 'center' }]}>
                      <View style={styles.courtItemRatingBadge}>
                        <Star color="#FFC107" size={10} fill="#FFC107" />
                        <Text style={styles.courtItemRatingText}>{court.rating}</Text>
                      </View>

                      <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={() => handleBookPress(court)}
                        style={styles.courtItemBookBtn}
                      >
                        <Text style={styles.courtItemBookBtnText}>Book Now</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top']}>
      {/* 100% NATIVE MOBILE SCREEN SWITCHER */}
      {currentScreen === 'explore' ? renderExploreScreen() : renderSearchScreen()}

      {/* SHARED PREMIUM BOOKING MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={bookingCourt !== null}
        onRequestClose={() => setBookingCourt(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentCard}>
            
            {/* Top sheet slider notch */}
            <View style={styles.modalTopIndicator} />

            {bookingCourt && (
              <View>
                {isBooked ? (
                  // Success State View
                  <View style={styles.successStateWrapper}>
                    <View style={styles.successIconOuter}>
                      <Check color={THEME.primaryLime} size={36} strokeWidth={3.5} />
                    </View>
                    <Text style={styles.successMainTitle}>Reservation Confirmed!</Text>
                    <Text style={styles.successDesc}>
                      Your court slot at <Text style={{ fontWeight: '800', color: '#000000' }}>{bookingCourt.name}</Text> is confirmed successfully. Get your paddles ready!
                    </Text>
                  </View>
                ) : (
                  // Selection Picker Form
                  <View>
                    <View style={[styles.flexRowBetween, { alignItems: 'flex-start' }]}>
                      <View style={{ flex: 1, paddingRight: 10 }}>
                        <Text style={styles.modalFormTag}>RESERVE A COURT</Text>
                        <Text style={styles.modalFormName}>{bookingCourt.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                          <MapPin color={THEME.textGray} size={12} />
                          <Text style={styles.modalFormLoc}>{bookingCourt.location}</Text>
                        </View>
                      </View>
                      
                      <View style={styles.modalPriceBox}>
                        <Text style={styles.modalPriceBoxTag}>RATE /hr</Text>
                        <Text style={styles.modalPriceBoxMain}>${bookingCourt.price}</Text>
                      </View>
                    </View>

                    <Text style={styles.modalFormDesc}>
                      {bookingCourt.description}
                    </Text>

                    {/* Date Picker row */}
                    <Text style={styles.modalFormSectionTitle}>Select Date</Text>
                    <View style={styles.flexRowBetween}>
                      {['Today, May 30', 'Tomorrow, May 31', 'Monday, Jun 1'].map((date) => {
                        const isDateActive = selectedDate === date;
                        return (
                          <TouchableOpacity 
                            key={date}
                            onPress={() => setSelectedDate(date)}
                            style={[styles.modalSlotBtn, isDateActive ? styles.modalSlotBtnActive : null]}
                          >
                            <Text style={[styles.modalSlotBtnText, isDateActive ? styles.modalSlotBtnTextActive : null]}>
                              {date}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    {/* Time Picker slots */}
                    <Text style={styles.modalFormSectionTitle}>Available Slots</Text>
                    <View style={{ rowGap: 8 }}>
                      {['03:00 PM - 04:00 PM', '05:00 PM - 06:00 PM', '07:00 PM - 08:00 PM'].map((time) => {
                        const isTimeActive = selectedTime === time;
                        return (
                          <TouchableOpacity 
                            key={time}
                            onPress={() => setSelectedTime(time)}
                            style={[styles.modalTimeRow, isTimeActive ? styles.modalTimeRowActive : null]}
                          >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Clock color={isTimeActive ? '#000000' : THEME.textGray} size={14} />
                              <Text style={[styles.modalTimeRowText, isTimeActive ? styles.modalTimeRowTextActive : null]}>
                                {time}
                              </Text>
                            </View>
                            {isTimeActive && (
                              <View style={styles.modalTimeRowIndicator}>
                                <Check color="#000000" size={10} strokeWidth={3} />
                              </View>
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    {/* Confirmation CTA button */}
                    <View style={styles.modalFormActionsRow}>
                      <TouchableOpacity 
                        onPress={() => setBookingCourt(null)}
                        style={styles.modalFormCancelBtn}
                      >
                        <Text style={styles.modalFormCancelBtnText}>Cancel</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        activeOpacity={0.85}
                        onPress={handleConfirmBooking}
                        style={styles.modalFormConfirmBtn}
                      >
                        <Text style={styles.modalFormConfirmBtnText}>Confirm Booking</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            )}

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ============================================
// MOBILE TARGETED PREMIUM STYLE SPECIFICATIONS
// ============================================
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: THEME.bgLight,
  },
  screenContainer: {
    flex: 1,
  },
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  // Explore Screen (Dashboard View)
  exploreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  exploreHeaderSub: {
    color: THEME.textGray,
    fontSize: 12.5,
    fontWeight: '700',
    fontFamily: THEME.fontFamily,
  },
  exploreHeaderMain: {
    color: THEME.textDark,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: 1,
    fontFamily: THEME.fontFamily,
  },
  exploreHeaderBrand: {
    color: THEME.textDark,
    fontSize: 30,
    fontWeight: '900',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: -1,
    lineHeight: 28,
    fontFamily: THEME.fontFamily,
  },
  notificationBtn: {
    width: 42,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderColor: '#E8ECE6',
    borderWidth: 1,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A2E1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E6E0',
    borderWidth: 1,
    borderRadius: 24,
    marginRight: 8,
  },
  chipText: {
    color: THEME.textGray,
    fontSize: 11,
    fontWeight: '700',
    fontFamily: THEME.fontFamily,
  },
  featuredCard: {
    width: '100%',
    height: 310,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#0A1C0A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
  featuredCardContent: {
    flex: 1,
    padding: 18,
    paddingTop: 18,
    paddingBottom: 16,
  },
  featuredTag: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  featuredTagText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 8.5,
    fontFamily: THEME.fontFamily,
  },
  ratingBadgePill: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  ratingBadgePillText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '800',
    marginLeft: 3,
    fontFamily: THEME.fontFamily,
  },
  featuredCardSub: {
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '800',
    fontSize: 8.5,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontFamily: THEME.fontFamily,
  },
  featuredCardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    fontFamily: THEME.fontFamily,
  },
  featuredCardDesc: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 10.5,
    marginTop: 4,
    lineHeight: 14.5,
    fontWeight: '400',
    fontFamily: THEME.fontFamily,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 10,
  },
  locationPillText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    marginLeft: 3,
    fontFamily: THEME.fontFamily,
  },
  featuredBookBtn: {
    flex: 1,
    backgroundColor: THEME.primaryLime,
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: THEME.primaryLime,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  featuredBookBtnText: {
    color: '#000000',
    fontWeight: '900',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: THEME.fontFamily,
  },
  bookmarkBtn: {
    width: 38,
    height: 38,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  upcomingHeaderTitle: {
    color: THEME.textDark,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    fontFamily: THEME.fontFamily,
  },
  upcomingBadge: {
    backgroundColor: '#000000',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  upcomingBadgeText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '800',
    textTransform: 'uppercase',
    fontFamily: THEME.fontFamily,
  },
  scheduleCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8ECE6',
    borderWidth: 1,
    padding: 14,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#1A2E1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  scheduleIconWrapper: {
    width: 38,
    height: 38,
    backgroundColor: 'rgba(202,252,5,0.12)',
    borderColor: 'rgba(202,252,5,0.2)',
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  scheduleCardHeading: {
    color: THEME.textDark,
    fontSize: 12,
    fontWeight: '800',
    fontFamily: THEME.fontFamily,
  },
  scheduleCardSub: {
    color: THEME.textGray,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 1.5,
    fontFamily: THEME.fontFamily,
  },
  calendarMiniCard: {
    backgroundColor: '#F3F6F2',
    borderColor: '#E2E6DF',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 42,
  },
  calendarMiniMonth: {
    color: THEME.textGray,
    fontSize: 7.5,
    fontWeight: '800',
    fontFamily: THEME.fontFamily,
  },
  calendarMiniDay: {
    color: THEME.textDark,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 13,
    marginTop: 2,
    fontFamily: THEME.fontFamily,
  },

  // Find a Court Screen (Search Listing View)
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  circleBackBtn: {
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderColor: '#E8ECE6',
    borderWidth: 1,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  searchHeaderTitle: {
    color: THEME.textDark,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
    fontFamily: THEME.fontFamily,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DFE3DD',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#1A2E1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: THEME.textDark,
    fontSize: 12,
    fontWeight: '600',
    outlineStyle: 'none' as any,
    fontFamily: THEME.fontFamily,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E4DE',
    borderWidth: 1,
    marginRight: 6,
  },
  filterPillActive: {
    backgroundColor: THEME.primaryLime,
    borderColor: THEME.primaryLime,
  },
  filterPillText: {
    color: THEME.textGray,
    fontSize: 9.5,
    fontWeight: '800',
    fontFamily: THEME.fontFamily,
  },
  filterPillTextActive: {
    color: '#000000',
  },
  courtItemCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8ECE6',
    borderWidth: 1,
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    shadowColor: '#1A2E1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  courtItemImg: {
    width: 86,
    height: 86,
    borderRadius: 14,
    backgroundColor: '#E8ECE6',
  },
  courtItemName: {
    color: THEME.textDark,
    fontSize: 13,
    fontWeight: '900',
    fontFamily: THEME.fontFamily,
  },
  courtItemPrice: {
    color: THEME.textDark,
    fontSize: 13,
    fontWeight: '900',
    fontFamily: THEME.fontFamily,
  },
  courtItemPriceHr: {
    color: THEME.textGray,
    fontSize: 8,
    fontWeight: '700',
    fontFamily: THEME.fontFamily,
  },
  courtItemDesc: {
    color: THEME.textGray,
    fontSize: 9.5,
    lineHeight: 13.5,
    marginTop: 4,
    fontFamily: THEME.fontFamily,
  },
  courtItemRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F6F2',
    borderColor: '#E2E6DF',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  courtItemRatingText: {
    color: THEME.textGray,
    fontSize: 8.5,
    fontWeight: '900',
    marginLeft: 3.5,
    fontFamily: THEME.fontFamily,
  },
  courtItemBookBtn: {
    backgroundColor: THEME.primaryLime,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    shadowColor: THEME.primaryLime,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  courtItemBookBtnText: {
    color: '#000000',
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    fontFamily: THEME.fontFamily,
  },
  noResultsBox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8ECE6',
    borderWidth: 1,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    color: THEME.textGray,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: THEME.fontFamily,
  },
  noResultsResetBtn: {
    marginTop: 12,
    backgroundColor: THEME.primaryLime,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  noResultsResetBtnText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '800',
    fontFamily: THEME.fontFamily,
  },

  // Bottom Modal Sheets
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    justifyContent: 'flex-end',
    zIndex: 9999,
  },
  modalContentCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#E8ECE6',
    padding: 24,
    paddingBottom: 40,
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  modalTopIndicator: {
    width: 44,
    height: 5,
    backgroundColor: '#E0E4DE',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  successStateWrapper: {
    alignItems: 'center',
    paddingVertical: 36,
  },
  successIconOuter: {
    width: 68,
    height: 68,
    backgroundColor: 'rgba(202,252,5,0.12)',
    borderColor: 'rgba(202,252,5,0.25)',
    borderWidth: 1,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successMainTitle: {
    color: THEME.textDark,
    fontSize: 18,
    fontWeight: '900',
    fontFamily: THEME.fontFamily,
  },
  successDesc: {
    color: THEME.textGray,
    fontSize: 11.5,
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 20,
    fontFamily: THEME.fontFamily,
  },
  modalFormTag: {
    color: THEME.textGray,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
    fontFamily: THEME.fontFamily,
  },
  modalFormName: {
    color: THEME.textDark,
    fontSize: 17,
    fontWeight: '900',
    fontFamily: THEME.fontFamily,
  },
  modalFormLoc: {
    color: THEME.textGray,
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 3,
    fontFamily: THEME.fontFamily,
  },
  modalPriceBox: {
    backgroundColor: '#F3F6F2',
    borderColor: '#E2E6DF',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: 'center',
    minWidth: 64,
  },
  modalPriceBoxTag: {
    color: THEME.textGray,
    fontSize: 7.5,
    fontWeight: '800',
    fontFamily: THEME.fontFamily,
  },
  modalPriceBoxMain: {
    color: THEME.textDark,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 2,
    fontFamily: THEME.fontFamily,
  },
  modalFormDesc: {
    color: THEME.textGray,
    fontSize: 10.5,
    lineHeight: 14.5,
    marginTop: 10,
    fontFamily: THEME.fontFamily,
  },
  modalFormSectionTitle: {
    color: THEME.textDark,
    fontSize: 10.5,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 20,
    marginBottom: 8,
    fontFamily: THEME.fontFamily,
  },
  modalSlotBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#F3F6F2',
    borderColor: '#E2E6DF',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  modalSlotBtnActive: {
    backgroundColor: 'rgba(202,252,5,0.12)',
    borderColor: THEME.primaryLime,
  },
  modalSlotBtnText: {
    color: THEME.textGray,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: THEME.fontFamily,
  },
  modalSlotBtnTextActive: {
    color: '#000000',
  },
  modalTimeRow: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#F3F6F2',
    borderColor: '#E2E6DF',
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTimeRowActive: {
    backgroundColor: 'rgba(202,252,5,0.12)',
    borderColor: THEME.primaryLime,
  },
  modalTimeRowText: {
    color: THEME.textGray,
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 8,
    fontFamily: THEME.fontFamily,
  },
  modalTimeRowTextActive: {
    color: '#000000',
  },
  modalTimeRowIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: THEME.primaryLime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalFormActionsRow: {
    flexDirection: 'row',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ECF0EA',
  },
  modalFormCancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#F3F6F2',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  modalFormCancelBtnText: {
    color: THEME.textGray,
    fontWeight: '800',
    fontSize: 11,
    fontFamily: THEME.fontFamily,
  },
  modalFormConfirmBtn: {
    flex: 1,
    backgroundColor: THEME.primaryLime,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: THEME.primaryLime,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  modalFormConfirmBtnText: {
    color: '#000000',
    fontWeight: '900',
    fontSize: 11.5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: THEME.fontFamily,
  },
});
