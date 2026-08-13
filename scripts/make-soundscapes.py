#!/usr/bin/env python3
"""Original looping beds: sea, palm, lamp, night insects. No samples reused."""
import math
import os
import random
import struct
import subprocess
import wave

SR = 44100
SECS = 18
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "sound")


def clamp(x):
    return max(-1.0, min(1.0, x))


def write_wav(path, samples):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with wave.open(path, "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        frames = b"".join(struct.pack("<h", int(clamp(s) * 32767)) for s in samples)
        w.writeframes(frames)


def fade(samples, ms=400):
    n = int(SR * ms / 1000)
    for i in range(n):
        samples[i] *= i / n
        samples[-1 - i] *= i / n
    return samples


def sea():
    rng = random.Random(7)
    out = []
    phase = 0.0
    brown = 0.0
    for i in range(SR * SECS):
        brown = (brown + rng.uniform(-0.02, 0.02)) * 0.985
        swell = 0.55 + 0.45 * math.sin(2 * math.pi * 0.07 * i / SR)
        wave = math.sin(2 * math.pi * 0.18 * i / SR + phase) * 0.08
        phase += 0.0004 * math.sin(i / 9000)
        out.append((brown * 2.4 + wave) * swell * 0.42)
    return fade(out)


def palm():
    rng = random.Random(11)
    out = [0.0] * (SR * SECS)
    for i in range(len(out)):
        rustle = rng.uniform(-1, 1)
        if i > 0:
            rustle = rustle * 0.35 + out[i - 1] * 0.2
        gust = 0.35 + 0.65 * (0.5 + 0.5 * math.sin(2 * math.pi * 0.11 * i / SR))
        # band-ish by differencing
        prev = out[i - 1] if i else 0
        out[i] = (rustle - prev * 0.4) * gust * 0.16
    return fade(out)


def lamp():
    rng = random.Random(3)
    out = []
    for i in range(SR * SECS):
        hiss = rng.uniform(-1, 1) * 0.03
        flicker = 0.85 + 0.15 * math.sin(2 * math.pi * 2.2 * i / SR)
        out.append(hiss * flicker)
    return fade(out, 600)


def insects():
    rng = random.Random(19)
    out = [0.0] * (SR * SECS)
    t = 0
    while t < SR * SECS:
        gap = int(SR * rng.uniform(0.35, 1.6))
        chirp_len = int(SR * rng.uniform(0.04, 0.09))
        freq = rng.uniform(3800, 6200)
        for i in range(chirp_len):
            idx = t + i
            if idx >= len(out):
                break
            env = math.sin(math.pi * i / chirp_len)
            out[idx] += math.sin(2 * math.pi * freq * i / SR) * env * 0.07
        t += gap + chirp_len
    return fade(out, 500)


def to_ogg(wav, ogg):
    subprocess.check_call(
        ["ffmpeg", "-y", "-i", wav, "-c:a", "libvorbis", "-q:a", "4", ogg],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    os.remove(wav)


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, fn in (("sea", sea), ("palm", palm), ("lamp", lamp), ("insects", insects)):
        wav = os.path.join(OUT, f"{name}.wav")
        ogg = os.path.join(OUT, f"{name}.ogg")
        write_wav(wav, fn())
        to_ogg(wav, ogg)
        print(ogg, os.path.getsize(ogg))


if __name__ == "__main__":
    main()
