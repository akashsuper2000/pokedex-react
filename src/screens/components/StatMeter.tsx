import React from 'react';
import { Typography } from '@material-ui/core';
import { PokemonStat } from '../../store/interfaces/PokemonDetail';
import { colors } from '../shared/colors';

type StatMeterProps = {
  stats: PokemonStat[];
};

const calculateMeterWidth = (width: number, stat: number) =>
  (stat / 255) * width;

export const StatMeter: React.FunctionComponent<StatMeterProps> = ({
  stats
}) => {
  const meterRef = React.useRef<HTMLDivElement>(null);
  const [meterWidth, setMeterWidth] = React.useState(0);

  React.useEffect(() => {
    if (!meterRef.current) {
      return;
    }

    setMeterWidth(meterRef.current.offsetWidth);
  });

  return (
    <>
      {stats.map((stat) => {
        const borderRadius = '20px';

        return (
          <div key={stat.stat.name}>
            <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
              {stat.stat.name}
            </Typography>
            <div
              ref={meterRef}
              style={{
                backgroundColor: colors.secondary,
                width: '100%',
                borderRadius
              }}
            >
              <div
                style={{
                  width: calculateMeterWidth(meterWidth, stat.base_stat),
                  backgroundColor: colors.primary,
                  marginTop: '10px',
                  marginBottom: '25px',
                  borderRadius
                }}
              >
                <Typography
                  variant="h6"
                  style={{ marginLeft: '10px', color: 'white' }}
                >
                  {stat.base_stat}
                </Typography>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
