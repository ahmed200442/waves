import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Pressable, FlatList, KeyboardAvoidingView, Platform, StyleSheet, StatusBar } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

type Message = { id: string; text: string; mine: boolean; time: string };
const initial: Message[] = [
  { id: '1', text: 'أهلاً بيك في WAVE ✨', mine: false, time: '8:40 م' },
  { id: '2', text: 'جاهزين نبدأ موجة جديدة؟ 🌊', mine: false, time: '8:41 م' },
  { id: '3', text: 'يلا بينا! 🚀', mine: true, time: '8:42 م' },
];

export default function App() {
  const [tab, setTab] = useState('الدردشة');
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState(initial);
  const [buzz, setBuzz] = useState(false);
  const title = useMemo(() => tab === 'الغرف' ? 'غرفتك على الموجة' : tab === 'الأصدقاء' ? 'أصحابك أونلاين' : tab === 'الملف' ? 'ملفك الشخصي' : 'الدردشة', [tab]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages(prev => [...prev, { id: String(Date.now()), text, mine: true, time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) }]);
    setDraft('');
  };

  return (
    <SafeAreaView style={s.safe}>
      <ExpoStatusBar style="light" />
      <StatusBar barStyle="light-content" backgroundColor="#070A13" />
      <View style={s.header}>
        <View>
          <Text style={s.brand}>WAVE<Text style={s.dot}>●</Text></Text>
          <Text style={s.sub}>YOUR PEOPLE. YOUR WAVE.</Text>
        </View>
        <View style={s.online}><View style={s.greenDot}/><Text style={s.onlineText}>متصل الآن</Text></View>
      </View>
      <View style={s.hero}>
        <View style={s.heroGlow}/>
        <Text style={s.eyebrow}>WAVE MESSENGER / 01</Text>
        <Text style={s.heroTitle}>{title}</Text>
        <Text style={s.heroSub}>خليك قريب من الناس اللي شبهك</Text>
      </View>
      <View style={s.tabs}>
        {['الدردشة','الأصدقاء','الغرف','الملف'].map(t => (
          <Pressable key={t} onPress={() => setTab(t)} style={[s.tab, tab === t && s.tabActive]}>
            <Text style={[s.tabText, tab === t && s.tabTextActive]}>{t}</Text>
          </Pressable>
        ))}
      </View>
      {tab === 'الدردشة' ? (
        <KeyboardAvoidingView style={s.chat} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={s.chatHead}>
            <View style={s.avatar}><Text style={s.avatarText}>W</Text></View>
            <View style={{flex:1}}><Text style={s.chatName}>Wave Lounge</Text><Text style={s.chatStatus}>●  محادثة تجريبية · 3 رسائل</Text></View>
            <Pressable style={s.buzz} onPress={() => setBuzz(v => !v)}><Text style={s.buzzText}>{buzz ? 'BUZZ ✓' : '〰 BUZZ'}</Text></Pressable>
          </View>
          <FlatList
            style={s.list}
            data={messages}
            keyExtractor={m => m.id}
            contentContainerStyle={s.messages}
            renderItem={({item}) => (
              <View style={[s.messageRow, item.mine && s.mineRow]}>
                {!item.mine && <View style={s.smallAvatar}><Text style={s.smallAvatarText}>W</Text></View>}
                <View style={[s.bubble, item.mine ? s.myBubble : s.theirBubble]}>
                  <Text style={s.messageText}>{item.text}</Text>
                  <Text style={s.time}>{item.time}</Text>
                </View>
              </View>
            )}
          />
          <View style={s.composer}>
            <TextInput value={draft} onChangeText={setDraft} placeholder="اكتب رسالتك..." placeholderTextColor="#7E879D" style={s.input} onSubmitEditing={send} returnKeyType="send" />
            <Pressable onPress={send} style={s.send}><Text style={s.sendText}>➤</Text></Pressable>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View style={s.placeholder}>
          <View style={s.placeholderIcon}><Text style={s.placeholderEmoji}>{tab === 'الغرف' ? '🎙️' : tab === 'الأصدقاء' ? '👥' : '✨'}</Text></View>
          <Text style={s.placeholderTitle}>{tab === 'الغرف' ? 'قريبًا: غرف صوتية' : tab === 'الأصدقاء' ? 'قريبًا: قائمة الأصدقاء' : 'أهلاً بك في WAVE'}</Text>
          <Text style={s.placeholderText}>دي نسخة أولية من الواجهة. المزامنة بين المستخدمين والصوت المباشر يحتاجان إلى إعداد الخادم وربط الخدمات.</Text>
          <Pressable style={s.outlineButton} onPress={() => setTab('الدردشة')}><Text style={s.outlineText}>العودة للدردشة</Text></Pressable>
        </View>
      )}
      <View style={s.footer}><Text style={s.footerText}>WAVE  ·  FIND YOUR FREQUENCY</Text><Text style={s.footerVersion}>v1.4.0</Text></View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
 safe:{flex:1,backgroundColor:'#070A13'},header:{paddingHorizontal:20,paddingTop:12,paddingBottom:16,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
 brand:{fontSize:29,fontWeight:'900',letterSpacing:3,color:'#F7FAFF'},dot:{color:'#B14CFF',fontSize:16},sub:{fontSize:8,letterSpacing:2,color:'#78839D',marginTop:1},
 online:{flexDirection:'row',alignItems:'center',gap:7,borderWidth:1,borderColor:'#253D42',borderRadius:20,paddingHorizontal:10,paddingVertical:7},greenDot:{width:7,height:7,borderRadius:4,backgroundColor:'#48F0B2'},onlineText:{color:'#A7B4C9',fontSize:11},
 hero:{marginHorizontal:16,padding:18,borderRadius:20,backgroundColor:'#11162A',borderWidth:1,borderColor:'#2D2855',overflow:'hidden'},heroGlow:{position:'absolute',right:-30,top:-40,width:150,height:150,borderRadius:100,backgroundColor:'#3B1D70',opacity:.4},eyebrow:{fontSize:9,letterSpacing:2,color:'#B58CFF',fontWeight:'700'},heroTitle:{fontSize:25,fontWeight:'800',color:'#F7F8FF',marginTop:9},heroSub:{fontSize:12,color:'#98A2BC',marginTop:5},
 tabs:{flexDirection:'row',marginHorizontal:16,marginTop:14,marginBottom:8,padding:4,backgroundColor:'#0E1220',borderRadius:14},tab:{flex:1,alignItems:'center',paddingVertical:10,borderRadius:11},tabActive:{backgroundColor:'#292044',borderWidth:1,borderColor:'#5B3A86'},tabText:{fontSize:11,color:'#8993AB'},tabTextActive:{color:'#E6D7FF',fontWeight:'800'},
 chat:{flex:1,marginHorizontal:16,marginTop:6,backgroundColor:'#0D1120',borderRadius:18,borderWidth:1,borderColor:'#20283B',overflow:'hidden'},chatHead:{flexDirection:'row',alignItems:'center',padding:13,borderBottomWidth:1,borderBottomColor:'#222A3D',gap:10},avatar:{width:40,height:40,borderRadius:14,backgroundColor:'#432A68',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#9A64DE'},avatarText:{color:'#F5E9FF',fontWeight:'900',fontSize:19},chatName:{color:'#F1F4FF',fontWeight:'800',fontSize:14},chatStatus:{color:'#48DDB0',fontSize:10,marginTop:3},buzz:{borderWidth:1,borderColor:'#7148A5',borderRadius:10,paddingHorizontal:10,paddingVertical:8},buzzText:{color:'#D7B9FF',fontSize:10,fontWeight:'800'},
 list:{flex:1},messages:{padding:12,gap:12},messageRow:{flexDirection:'row',alignItems:'flex-end',gap:7},mineRow:{justifyContent:'flex-end'},smallAvatar:{width:25,height:25,borderRadius:9,backgroundColor:'#3A2959',alignItems:'center',justifyContent:'center'},smallAvatarText:{color:'#E9D9FF',fontSize:10,fontWeight:'900'},bubble:{maxWidth:'82%',paddingHorizontal:12,paddingVertical:9,borderRadius:15},theirBubble:{backgroundColor:'#171E30',borderBottomLeftRadius:4,borderWidth:1,borderColor:'#26314A'},myBubble:{backgroundColor:'#33234D',borderBottomRightRadius:4,borderWidth:1,borderColor:'#6B3D91'},messageText:{fontSize:13,color:'#F2F4FC',lineHeight:20},time:{fontSize:9,color:'#929CB3',textAlign:'right',marginTop:4},
 composer:{flexDirection:'row',alignItems:'center',padding:10,gap:8,borderTopWidth:1,borderTopColor:'#222A3D'},input:{flex:1,backgroundColor:'#151B2B',borderRadius:13,paddingHorizontal:13,paddingVertical:11,color:'#FFFFFF',fontSize:13,textAlign:'right'},send:{width:43,height:43,borderRadius:13,backgroundColor:'#9A4DDF',alignItems:'center',justifyContent:'center'},sendText:{fontSize:21,color:'#FFFFFF',fontWeight:'900'},
 placeholder:{flex:1,alignItems:'center',justifyContent:'center',paddingHorizontal:30},placeholderIcon:{width:76,height:76,borderRadius:24,backgroundColor:'#211936',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#593A7B'},placeholderEmoji:{fontSize:32},placeholderTitle:{fontSize:20,fontWeight:'800',color:'#F4F4FF',marginTop:18},placeholderText:{fontSize:13,color:'#98A2BC',textAlign:'center',lineHeight:22,marginTop:9},outlineButton:{marginTop:20,borderWidth:1,borderColor:'#8C52C5',borderRadius:12,paddingHorizontal:18,paddingVertical:11},outlineText:{color:'#D8B7FF',fontWeight:'700'},
 footer:{paddingHorizontal:20,paddingVertical:10,flexDirection:'row',justifyContent:'space-between'},footerText:{fontSize:8,color:'#59647E',letterSpacing:1.5},footerVersion:{fontSize:9,color:'#6B7590'}
});
