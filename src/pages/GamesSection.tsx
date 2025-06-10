import TiltedCard from "../components/TiltedCard";
import '../styles/GameSection.css'

const GamesSection = () => {
    return(
        <main>
            <div className="grid">
                <TiltedCard
                    imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
                    altText="Jogo Da Véia"
                    captionText="Jogo Da Véia"
                    containerHeight="200px"
                    containerWidth="200px"
                    imageHeight="300px"
                    imageWidth="300px"
                    rotateAmplitude={12}
                    scaleOnHover={1.2}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                    overlayContent={
                        <p className="tilted-card-demo-text">
                        Jogo Da Véia
                        </p>
                    }
                />
                
                <TiltedCard
                    imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
                    altText="Kendrick Lamar - GNX Album Cover"
                    captionText="Kendrick Lamar - GNX"
                    containerHeight="300px"
                    containerWidth="300px"
                    imageHeight="300px"
                    imageWidth="300px"
                    rotateAmplitude={12}
                    scaleOnHover={1.2}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                    overlayContent={
                        <p className="tilted-card-demo-text">
                        Kendrick Lamar - GNX
                        </p>
                    }
                />

            </div>
        </main>
    );
}

export default GamesSection;