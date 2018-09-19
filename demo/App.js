import 'intersection-observer';
import React, { Component } from 'react';
import LazyElement from './LazyElement';
import { ScrollView, StickySection } from '../src';

const styles = {
	container: {
		width: '100%',
		height: '100vh',
		margin: 0,
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: 'white',
	},
	contentContainer: {
		padding: 40,
	},
	sticky: {
		width: '100%',
		backgroundColor: 'rgba(255, 255, 255, 0.96)',
	},
	alpha: {
		width: '100%',
		margin: 0,
		padding: 20,
		backgroundColor: '#f0f2f7',
	},
};

export default class App extends Component {
	state = {
		isRefreshing: false,
	};

	handleScrollStart = () => {
		// console.log('scroll start');
	};

	handleScrollEnd = () => {
		// console.log('scroll end');
	};

	handleEndReached = () => {
		console.log('end reached');
	};

	handleRefresh = () => {
		console.log('refresh');
		this.setState(() => ({ isRefreshing: true }));
		setTimeout(() => {
			this.setState(() => ({ isRefreshing: false }));
		}, 2000);
	};

	render() {
		const { isRefreshing } = this.state;
		return (
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
				endReachedThreshold={500}
				onScrollStart={this.handleScrollStart}
				onScrollEnd={this.handleScrollEnd}
				onEndReached={this.handleEndReached}
				onRefresh={this.handleRefresh}
				isRefreshing={isRefreshing}
			>
				<StickySection
					debugId="section-1"
					sticky={<h1 style={styles.sticky}>React Scroll View</h1>}
				>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id sem
						venenatis ipsum venenatis fringilla vel ut ipsum. Vivamus iaculis
						ullamcorper porttitor. In nec erat leo. Pellentesque habitant morbi
						tristique senectus et netus et malesuada fames ac turpis egestas.
						Suspendisse non erat id sapien gravida pellentesque nec nec lacus.
						Pellentesque varius mauris erat, in molestie ex vestibulum ac.
						Pellentesque sollicitudin nibh sit amet mauris molestie lacinia quis
						non turpis. Phasellus tempor nibh a erat dignissim ultrices.
						Suspendisse vulputate justo eros, eu convallis leo accumsan vel.
						Aliquam placerat eleifend urna nec finibus. Ut in magna at tortor
						viverra facilisis. Duis urna quam, pulvinar non eleifend eget,
						iaculis blandit ante.
					</p>
					<p>
						Donec odio elit, iaculis a tortor iaculis, facilisis molestie nibh.
						Sed turpis felis, aliquet sit amet fermentum ac, consectetur a elit.
						Maecenas nulla ex, egestas non erat vel, rhoncus mollis erat. Donec
						tincidunt enim non turpis vehicula luctus. Nulla blandit massa arcu,
						a aliquam est molestie vitae. Vestibulum tristique nibh cursus nisi
						porttitor dapibus. Fusce ultricies neque at diam facilisis cursus.
						Aliquam hendrerit quam arcu, ut cursus augue molestie aliquet. Nam
						scelerisque lorem sed urna laoreet, vel malesuada quam ultricies.
						Cras aliquet arcu eu tortor suscipit, eget dignissim turpis auctor.
					</p>
					<p>
						Donec condimentum leo felis, ut efficitur nunc condimentum sed.
						Fusce condimentum turpis vitae nunc vulputate viverra. Etiam eget
						pharetra magna, non pharetra ligula. Vivamus in lacus sed ex gravida
						sagittis. Morbi finibus, justo ut facilisis posuere, magna dui
						egestas lacus, eget convallis nisl felis sit amet felis. Etiam
						sollicitudin sem eu odio varius, in fermentum quam sollicitudin. Sed
						suscipit ante vel nunc tristique consectetur. Morbi semper, leo ac
						rhoncus commodo, urna magna semper ante, non pharetra ante lectus id
						felis. Nulla in cursus quam. Pellentesque sed pretium lacus.
						Praesent libero diam, maximus quis nulla a, fringilla rhoncus ipsum.
						Mauris tempus quis nisl id feugiat. Aliquam erat volutpat. Cras
						cursus mollis augue in condimentum. Nulla lectus nisi, mattis eu
						hendrerit quis, laoreet id risus.
					</p>
				</StickySection>
				<StickySection
					debugId="section-2"
					sticky={
						<h1 style={styles.sticky}>
							Ut mollis hendrerit erat fermentum tristique.
						</h1>
					}
				>
					<p>
						Orci varius natoque penatibus et magnis dis parturient montes,
						nascetur ridiculus mus. Vivamus maximus vitae libero quis suscipit.
						Sed et neque rutrum, facilisis tortor ac, sagittis felis. Morbi
						consequat tincidunt placerat. Cras non magna nec purus dapibus
						ultricies vel non mi. Orci varius natoque penatibus et magnis dis
						parturient montes, nascetur ridiculus mus. Nam ultricies tempus
						viverra. Ut molestie eget orci molestie fermentum. Morbi ac laoreet
						nunc. Maecenas a ipsum sed lectus bibendum imperdiet in quis libero.
						Phasellus at risus tortor. Vivamus ac velit non tellus commodo
						semper sed ac purus. Nam sed vestibulum lacus. Sed eu mattis dui, in
						malesuada dolor. Quisque eleifend consequat mi a mollis.
					</p>
					<p>
						Ut dignissim, dui at fermentum rutrum, quam nisl mattis justo, in
						imperdiet enim quam sit amet lectus. Donec varius ligula et nisl
						imperdiet, id convallis enim posuere. Donec sit amet vulputate
						ligula, eu tincidunt elit. Quisque ultrices imperdiet scelerisque.
						Proin libero metus, facilisis vitae fermentum tincidunt, vehicula at
						augue. Sed ut massa id purus blandit faucibus volutpat ultricies
						eros. Aliquam faucibus efficitur nulla, tincidunt ultrices magna
						blandit vel. Nullam pulvinar gravida lorem a pharetra. Curabitur
						sollicitudin maximus elit, eget rutrum nisl ullamcorper a. Maecenas
						suscipit elementum turpis in pellentesque. Nunc dui enim, aliquam
						eget lacinia non, dapibus ut ex. Morbi sit amet condimentum odio.
						Mauris vel cursus lorem.
					</p>
					<p>
						Pellentesque tempus, dui ac ultricies elementum, neque ligula
						faucibus nulla, non blandit arcu nisi id arcu. Sed volutpat lorem a
						nulla gravida vehicula. Etiam quis semper arcu. Sed felis dolor,
						interdum vel purus eu, aliquet interdum erat. In convallis nulla
						nibh, porta tincidunt nibh vulputate eu. Nullam consectetur
						tristique tempor. Mauris id tristique neque. Donec vitae metus at
						ipsum bibendum varius. Ut tincidunt lacus a ligula faucibus, in
						rutrum orci suscipit. Aenean nec consequat sem, et tempor augue.
					</p>
				</StickySection>
				<StickySection
					debugId="section-3"
					sticky={<h1 style={styles.sticky}>Maecenas nunc.</h1>}
				>
					<p>
						Donec non facilisis eros. Morbi et felis quis neque aliquam rhoncus.
						Etiam ut facilisis enim, eu vestibulum eros. Sed aliquam libero nec
						magna interdum, sit amet ullamcorper lacus rhoncus. Curabitur quam
						lorem, eleifend vel viverra nec, sodales at urna. Morbi lacus
						turpis, volutpat vitae volutpat eget, egestas in risus. Donec magna
						metus, suscipit a posuere a, pulvinar vestibulum tortor. Vestibulum
						ante ipsum primis in faucibus orci luctus et ultrices posuere
						cubilia Curae; Nam cursus felis purus, vel pulvinar lorem tincidunt
						quis. Pellentesque vehicula vehicula metus, eget auctor lectus
						auctor id. Etiam sed efficitur tortor.
					</p>
					<p>
						Aliquam non ex vel leo pretium scelerisque in nec purus. Vivamus vel
						nunc massa. Proin at lorem eu risus convallis rhoncus a eu ipsum.
						Cras eleifend eget enim nec molestie. Praesent feugiat erat ut est
						maximus gravida. Curabitur sed nibh id sem laoreet rhoncus non in
						augue. Donec ultricies magna ut vestibulum luctus. Vestibulum auctor
						elementum ligula non congue. Proin interdum malesuada mi vel
						sollicitudin. Vestibulum finibus bibendum massa in feugiat.
						Suspendisse vulputate neque eget turpis aliquam, ac cursus nibh
						convallis. Sed ultricies vulputate nisi eget ullamcorper. Vivamus
						sagittis augue orci, eu condimentum augue malesuada pretium. Nulla
						tempor consectetur tortor eget eleifend. Nam non mollis nulla.
						Vestibulum laoreet lectus est, id mattis turpis tincidunt
						sollicitudin.
					</p>
					<p>
						Morbi venenatis id quam vel condimentum. Maecenas euismod eu ex a
						efficitur. Ut varius mollis dui, nec ornare sem porta sed. Proin et
						neque id orci pulvinar consequat. Nullam et velit nunc. Class aptent
						taciti sociosqu ad litora torquent per conubia nostra, per inceptos
						himenaeos. Nulla feugiat, sapien sit amet tincidunt lobortis, diam
						mauris fermentum diam, sed volutpat lacus justo ut metus.
						Suspendisse porttitor eros id eros cursus, vel venenatis est
						aliquam.
					</p>

					<ScrollView style={{ height: 400 }}>
						<StickySection debugId="A" sticky={<p style={styles.alpha}>A</p>}>
							<ul>
								<li>Adelia Pisano</li>
								<li>Alayna Loredo</li>
								<li>Arnold Roselli</li>
								<li>Ashlee Dollar</li>
							</ul>
						</StickySection>
						<StickySection debugId="B" sticky={<p style={styles.alpha}>B</p>}>
							<ul>
								<li>Brant Hunsberger</li>
							</ul>
						</StickySection>
						<StickySection debugId="C" sticky={<p style={styles.alpha}>C</p>}>
							<ul>
								<li>Carl Wetzler</li>
								<li>Cherry Greeno</li>
								<li>Cris Kepley</li>
								<li>Cyril Mikula</li>
							</ul>
						</StickySection>
						<StickySection debugId="D" sticky={<p style={styles.alpha}>D</p>}>
							<ul>
								<li>Diedre Zell</li>
								<li>Dino Grindstaff</li>
								<li>Dusty Desantiago</li>
							</ul>
						</StickySection>
						<StickySection sticky={<p style={styles.alpha}>E</p>}>
							<ul>
								<li>Ebony Lafave</li>
								<li>Ela Eubanks</li>
								<li>Eliseo Yeomans</li>
							</ul>
						</StickySection>
						<StickySection sticky={<p style={styles.alpha}>F</p>}>
							<ul>
								<li>Freddy Nghiem</li>
							</ul>
						</StickySection>
						<StickySection sticky={<p style={styles.alpha}>G</p>}>
							<ul>
								<li>Gia Ishikawa</li>
								<li>Grover Castruita</li>
								<li>Gus Riles</li>
							</ul>
						</StickySection>
						<StickySection sticky={<p style={styles.alpha}>H</p>}>
							<ul>
								<li>Herma Fomby</li>
							</ul>
						</StickySection>
						<StickySection sticky={<p style={styles.alpha}>I</p>}>
							<ul>
								<li>Ignacia Kincheloe</li>
								<li>Inell Ellison</li>
								<li>Isis Wehr</li>
							</ul>
						</StickySection>
						<StickySection sticky={<p style={styles.alpha}>J</p>}>
							<ul>
								<li>Jacquetta Eugene</li>
								<li>Jammie Coby</li>
							</ul>
						</StickySection>
						<StickySection sticky={<p style={styles.alpha}>K</p>}>
							<ul>
								<li>Kirk Dudgeon</li>
							</ul>
						</StickySection>
						<StickySection sticky={<p style={styles.alpha}>L</p>}>
							<ul>
								<li>Lamar Trusty</li>
								<li>Larisa Yearwood</li>
								<li>Lawanna Vanauken</li>
								<li>Leora Mcbeath</li>
								<li>Lyndon Goggin</li>
							</ul>
						</StickySection>
						<StickySection sticky={<p style={styles.alpha}>M</p>}>
							<ul>
								<li>Madelyn Covell</li>
								<li>Margarita Janson</li>
								<li>Marvis Dragoo</li>
								<li>May Bedgood</li>
								<li>Maynard Curling</li>
								<li>Melonie Tison</li>
								<li>Michell Fairfield</li>
								<li>Mirna Stiger</li>
							</ul>
						</StickySection>
						<StickySection sticky={<p style={styles.alpha}>N</p>}>
							<ul>
								<li>Nereida Rappaport</li>
							</ul>
						</StickySection>
						<StickySection sticky={<p style={styles.alpha}>P</p>}>
							<ul>
								<li>Pete Smale</li>
							</ul>
						</StickySection>
						<StickySection sticky={<p style={styles.alpha}>R</p>}>
							<ul>
								<li>Rosana Mullikin</li>
							</ul>
						</StickySection>
						<StickySection sticky={<p style={styles.alpha}>S</p>}>
							<ul>
								<li>Selina Burrow</li>
								<li>Silva Wilcox</li>
								<li>Soledad Nolin</li>
								<li>Sonia Bettcher</li>
								<li>Sumiko Slonaker</li>
								<li>Suzanne Ivey</li>
							</ul>
						</StickySection>
						<StickySection sticky={<p style={styles.alpha}>V</p>}>
							<ul>
								<li>Victor Bolinger</li>
							</ul>
						</StickySection>
						<StickySection sticky={<p style={styles.alpha}>W</p>}>
							<ul>
								<li>Wanetta Steinmetz</li>
							</ul>
						</StickySection>
					</ScrollView>
				</StickySection>
				<StickySection
					sticky={
						<h1 style={styles.sticky}>
							Etiam maximus ultrices purus eget eleifend.
						</h1>
					}
					debugId="section-4"
				>
					<p>
						Vestibulum nec quam rhoncus libero elementum volutpat. Morbi id
						ligula eget lectus tristique rutrum. Vestibulum ac consequat nulla.
						In vestibulum sollicitudin tempor. Quisque egestas, arcu at
						condimentum pretium, ipsum sem tincidunt ipsum, sit amet vulputate
						massa ante eget erat. Vestibulum leo ex, suscipit sed ipsum quis,
						scelerisque malesuada est. Aenean eu tincidunt nulla. Pellentesque
						habitant morbi tristique senectus et netus et malesuada fames ac
						turpis egestas.
					</p>
					<p>
						Fusce semper blandit orci at cursus. Praesent vitae bibendum tortor.
						Pellentesque dui ligula, aliquet egestas felis vel, rutrum dictum
						velit. Nunc ac rhoncus erat. Nam faucibus neque quis diam ultrices,
						a tristique ipsum tempor. Quisque egestas ex tortor, eu faucibus
						odio elementum sit amet. Ut varius convallis ligula ac elementum.
					</p>
					<p>
						Aliquam semper dolor eu vestibulum fringilla. Curabitur eget tellus
						leo. Suspendisse maximus in tortor vel fringilla. Sed diam ligula,
						laoreet eu velit vel, fermentum fringilla enim. Aliquam fermentum
						neque sed est scelerisque fermentum. Vivamus sollicitudin, velit a
						congue tincidunt, urna neque gravida leo, sit amet efficitur nulla
						tellus ut ex. Aliquam dapibus a mauris sed mattis. Pellentesque eu
						placerat ex, eu pulvinar risus.
					</p>
					<p>
						Nam venenatis sodales enim. Praesent auctor erat ligula, eu feugiat
						ex ultricies et. Cras condimentum ut purus venenatis volutpat.
						Curabitur tellus ex, pharetra dignissim pulvinar at, semper a risus.
						Donec ut posuere nisl. Ut non elit non tellus cursus scelerisque.
						Fusce et hendrerit libero. Ut vestibulum iaculis laoreet. Aliquam
						blandit, eros consectetur iaculis convallis, justo lacus tincidunt
						arcu, sed imperdiet eros justo at augue. Phasellus auctor leo vel
						egestas sodales. Aliquam erat volutpat. Nullam mollis vestibulum
						massa in dictum. Vestibulum vel lacinia lacus. Ut bibendum et ligula
						sit amet fermentum. Aliquam ante enim, pretium eget malesuada quis,
						luctus sit amet odio.
					</p>
					<p>
						Donec libero diam, pellentesque eget fermentum a, pharetra sit amet
						ipsum. Pellentesque sed est at tellus cursus fringilla. Etiam et
						molestie velit. Nunc tempus placerat velit, facilisis ullamcorper
						erat faucibus ac. Etiam pharetra lectus purus, sed accumsan ligula
						malesuada in. Aliquam erat volutpat. Nam eros odio, congue et odio
						eget, eleifend viverra neque. Proin ullamcorper commodo nulla vel
						bibendum. Nam congue arcu odio, a placerat tellus dictum eu. Sed
						enim mi, molestie vitae finibus id, condimentum in ex. Vestibulum
						cursus, tortor eget bibendum porttitor, enim justo ultrices arcu,
						quis blandit nibh enim a quam. Nulla eu ipsum augue. Vivamus eu
						lorem a mi dictum viverra.
					</p>
					<LazyElement>
						<h1>Lazy</h1>
					</LazyElement>
					<p>
						In bibendum cursus erat, molestie varius nibh varius sed. Donec orci
						libero, consequat sed viverra non, blandit vitae nibh. Morbi quis
						pellentesque tortor, vestibulum iaculis felis. Mauris at lacinia
						elit. Suspendisse fringilla erat ac odio gravida tempus. Integer
						enim ipsum, laoreet non vulputate vel, eleifend sed mi. Nulla
						laoreet, sapien nec sagittis scelerisque, quam nulla lobortis
						tellus, id accumsan neque tellus eget arcu. Suspendisse
						sollicitudin, augue eu egestas viverra, sem nisi blandit turpis, non
						vestibulum eros sem id diam.
					</p>
					<p>
						Ut volutpat lacus non tortor sollicitudin, non pulvinar elit porta.
						Donec sollicitudin, est eu lobortis porttitor, augue nibh mattis
						dui, nec ullamcorper neque massa in ipsum. Donec eu libero a massa
						aliquam congue vestibulum id quam. Duis justo diam, suscipit in
						sagittis nec, rhoncus eget dui. Cras molestie quam turpis, ut
						sodales sem ultricies mollis. Quisque tortor tellus, accumsan in
						pretium in, euismod et magna. Duis consequat semper quam id
						pellentesque. Integer condimentum massa ut magna feugiat, eu tempor
						turpis molestie. Duis finibus, risus vitae placerat convallis,
						mauris libero efficitur magna, quis efficitur ligula dui ac tellus.
						Nunc vulputate purus pulvinar mauris egestas, id consequat ligula
						aliquet. Donec tempus gravida erat eu posuere.
					</p>
					<p>
						Nullam vel pellentesque sem. Integer libero leo, dictum at arcu eu,
						egestas sagittis sapien. Aliquam non quam metus. Aliquam vestibulum
						posuere nisl, a imperdiet urna dapibus sit amet. Aenean in ligula at
						neque venenatis vestibulum. Sed et tincidunt velit. Ut vestibulum
						commodo pretium.
					</p>
					<p>
						In sit amet viverra nisi, vitae consequat felis. Vestibulum non nunc
						a nunc tincidunt consequat sed non ante. Maecenas ante lorem,
						tincidunt nec semper nec, feugiat ac nunc. Proin in leo velit. Etiam
						accumsan lectus sed fringilla vulputate. Donec maximus dolor sit
						amet sollicitudin commodo. Sed facilisis ut dolor id pulvinar.
						Praesent et nisl neque. Cras euismod augue et odio lobortis porta
						sed non neque.
					</p>
					<p>
						Aliquam libero ipsum, consequat ac sem non, volutpat posuere erat.
						Duis pulvinar tincidunt leo, et tempor eros commodo in. Aliquam in
						feugiat metus. Nam ac sollicitudin velit. Integer bibendum, ipsum
						quis vestibulum volutpat, dolor felis rhoncus tellus, quis laoreet
						sem enim id urna. Suspendisse sagittis id velit quis rutrum. Nullam
						vitae convallis nulla. Suspendisse leo nisl, dictum nec mi non,
						elementum varius risus. Mauris at dui ipsum. Morbi rutrum efficitur
						scelerisque. Mauris quis dictum est. Praesent placerat sit amet
						tellus quis sodales. Vestibulum eget dui eu ligula rutrum faucibus.
						Curabitur interdum dolor felis, ac suscipit magna scelerisque nec.
						Duis sed ultrices augue.
					</p>
					<p>
						Integer vehicula massa ipsum, non mollis urna consectetur nec. Donec
						quis sem tincidunt, commodo justo ac, pellentesque purus. Phasellus
						ultrices, velit a eleifend rutrum, augue justo sagittis lorem, sed
						finibus erat velit vel augue. Duis fermentum in lectus eget pretium.
						Nullam eu condimentum mauris. Nam euismod ante vitae convallis
						convallis. Sed nec consequat nisi. Nulla facilisi. Nunc a felis nec
						mi tempor tempus non ut orci.
					</p>
				</StickySection>
			</ScrollView>
		);
	}
}
